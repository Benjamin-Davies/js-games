import Terrain from './terrain.js';
import Player from './player.js';

export default class {
  /**
   * Create a new instance of the simple game Boing
   * @param {HTMLCanvasElement} canvas The element to draw the game to
   */
  constructor(canvas) {
    this.canvas = canvas;
  }

  /**
   * Initialize and run the game
   */
  run() {
    this.ctx = this.canvas.getContext('2d');

    this.terrain = new Terrain();
    this.player = new Player();

    window.addEventListener('resize', () => this.resize());
    document.addEventListener('keydown', ev => this.keyStateChanged(ev, true));
    document.addEventListener('keyup', ev => this.keyStateChanged(ev, false));

    const loop = () => {
      requestAnimationFrame(loop);
      this.update();
      this.draw();
    };

    this.resize();
    requestAnimationFrame(loop);
  }

  /**
   * Called when the window is resized
   */
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Called when a key is pressed or released
   * @param {KeyboardEvent} ev The keyboard event
   * @param {boolean} state The key's new state
   */
  keyStateChanged(ev, state) {
    switch (ev.key.toLowerCase()) {
      case 'w':
        this.player.jump = state;
        break;
      case 'a':
        this.player.left = state;
        break;
      case 'd':
        this.player.right = state;
        break;
    }
  }

  /**
   * Update the game
   */
  update() {
    this.player.update(this.terrain);

    if (this.player.y > 5) this.player = new Player();
  }

  /**
   * Draw the game
   */
  draw() {
    this.ctx.fillStyle = 'cornflowerblue';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    const blockSize = this.canvas.height / 5;
    this.ctx.scale(blockSize, blockSize);
    this.ctx.translate(2 - this.player.x, 0);

    this.terrain.draw(this.ctx);
    this.player.draw(this.ctx);

    this.ctx.restore();
  }
}
