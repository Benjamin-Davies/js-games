import { Ninja } from './ninja.js';
import { loadImage } from './loaders.js';

const w = 800,
  h = 600;

export default class Game {
  constructor(canvas = document.createElement('canvas')) {
    this.canvas = canvas;
    this.canvas.width = w;
    this.canvas.height = h;
  }

  async start() {
    const ctx = this.canvas.getContext('2d');

    await this.load();

    this.init();

    const loop = () => {
      requestAnimationFrame(loop);
      this.update();
      this.draw(ctx);
    };
    requestAnimationFrame(loop);
  }

  async load() {
    [this.goodImage, this.evilImage] = await Promise.all([
      loadImage('./images/ninja.png'),
      loadImage('./images/evil.png')
    ]);
  }

  init() {
    this.good = new Ninja(20, 20);
    this.evil = new Ninja(w - 120, 20);

    document.addEventListener('keydown', ev => {
      if (this.gameFinished()) return;

      switch (ev.key.toLowerCase()) {
        case 'w':
          this.good.velY = -20;
          break;
        case 'a':
          this.good.velX = -10;
          break;
        case 'd':
          this.good.velX = 10;
          break;
        case 'q':
          if (this.inAttackRange()) {
            this.evil.hp--;
            this.evil.repelFrom(this.good, true);
          }
          break;
        case 'i':
          this.evil.velY = -20;
          break;
        case 'j':
          this.evil.velX = -10;
          break;
        case 'l':
          this.evil.velX = 10;
          break;
        case 'u':
          if (this.inAttackRange()) {
            this.good.hp--;
            this.good.repelFrom(this.evil, true);
          }
          break;
      }
    });
  }

  inAttackRange() {
    const dx = this.good.x - this.evil.x;
    const dy = this.good.y - this.evil.y;
    const magSq = dx * dx + dy * dy;
    return magSq < 100 * 100;
  }

  update() {
    if (this.gameFinished()) return;

    this.good.repelFrom(this.evil);
    this.evil.repelFrom(this.good);

    this.good.update();
    this.evil.update();
  }

  gameFinished() {
    return this.good.hp <= 0 || this.evil.hp <= 0;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = '#0cf';
    ctx.fillRect(0, 0, w, h);

    this.good.draw(ctx, this.goodImage);
    this.evil.draw(ctx, this.evilImage);

    ctx.textBaseline = 'top';
    ctx.font = '32px monospace';

    // Good hp meter
    ctx.fillStyle = '#ccc';
    ctx.fillRect(10, 10, 200, 20);
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, this.good.hp * 10, 20);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 200, 20);

    // Bad hp meter
    ctx.fillStyle = '#ccc';
    ctx.fillRect(790, 10, -200, 20);
    ctx.fillStyle = 'red';
    ctx.fillRect(790, 10, this.evil.hp * -10, 20);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(790, 10, -200, 20);

    if (this.gameFinished()) {
      ctx.font = '64px sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      if (this.good.hp > this.evil.hp) {
        // Good wins
        ctx.fillStyle = 'blue';
        ctx.fillText('Good has won', w / 2, h / 2);
      } else {
        // Bad wins
        ctx.fillStyle = 'red';
        ctx.fillText('Evil has won', w / 2, h / 2);
      }
    }
  }
}
