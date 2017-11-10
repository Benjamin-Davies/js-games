import { Pipe } from './pipe.js';
import { Bird } from './bird.js';

const w = 850,
  h = 480,
  pipeSpacing = 500;

const State = { MENU: 0, PLAYING: 1, GAMEOVER: 2 };

export class Game {
  /**
   * @param {HTMLCanvasElement} canvas The canvas used to render the game, or it's id.
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');

    this.state = State.MENU;

    document.addEventListener('keydown', ev => {
      if (ev.key === ' ')
        switch (this.state) {
          case State.MENU:
            this.bird = new Bird();
            this.pipes = [];
            this.nextPipe = pipeSpacing;
            this.state = State.PLAYING;
            break;
          case State.PLAYING:
            this.bird.flap();
            break;
          case State.GAMEOVER:
            this.state = State.MENU;
            break;
        }
    });

    requestAnimationFrame(() => this.draw());
  }

  draw() {
    requestAnimationFrame(() => this.draw());

    switch (this.state) {
      case State.MENU:
        this.ctx.fillStyle = '#0cf';
        this.ctx.fillRect(0, 0, w, h);

        this.ctx.fillStyle = 'green';
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.font = '64px sans-serif';
        this.ctx.fillText('Happy Bird', w / 2, h / 3);
        this.ctx.font = '32px sans-serif';
        this.ctx.fillText('Press [Space] to begin', w / 2, h * 2 / 3);
        break;
      case State.GAMEOVER:
        const timeSinceEnd = performance.now() - this.gameOverStart;

        this.ctx.save();
        this.ctx.translate(0, Math.min(timeSinceEnd - h, 0));

        this.ctx.fillStyle = 'crimson';
        this.ctx.fillRect(0, 0, w, h);

        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'yellow';
        this.ctx.font = '64px sans-serif';
        this.ctx.fillText('Game Over', w / 2, h / 3);
        this.ctx.fillStyle = '#0cf';
        this.ctx.font = '48px monospace';
        this.ctx.fillText(
          `Your score: ${Math.floor(this.bird.x / pipeSpacing)}`,
          w / 2,
          h / 2
        );
        this.ctx.fillStyle = 'green';
        this.ctx.font = '32px sans-serif';
        this.ctx.fillText('Press [Space] to continue', w / 2, h * 2 / 3);

        this.ctx.restore();
        break;
      case State.PLAYING:
        this.bird.update();
        if (
          this.bird.y > h ||
          this.bird.y < 0 ||
          this.pipes.some(pipe => pipe.collides(this.bird))
        ) {
          this.state = State.GAMEOVER;
          this.gameOverStart = performance.now();
        }

        this.pipes = this.pipes.filter(pipe => pipe.x >= this.bird.x - 200);
        while (this.pipes.length < 20) {
          this.pipes.push(new Pipe(this.nextPipe, Math.random() * 280 + 100));
          this.nextPipe += pipeSpacing;
        }

        this.ctx.fillStyle = '#0cf';
        this.ctx.fillRect(0, 0, w, h);

        this.ctx.save();
        this.ctx.translate(100 - this.bird.x, 0);

        this.bird.draw(this.ctx);
        this.pipes.forEach(pipe => pipe.draw(this.ctx));

        this.ctx.restore();

        this.ctx.fillStyle = 'black';
        this.ctx.font = '32px monospace';
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(Math.floor(this.bird.x / pipeSpacing), 10, 10);
        break;
    }
  }
}
