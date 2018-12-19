import { Laser } from './laser.js';
import { Alien } from './alien.js';
import { Player } from './player.js';
const w = 800,
  h = 600;

export default class Game {
  constructor(canvas = document.createElement('canvas')) {
    this.canvas = canvas;
    this.canvas.width = w;
    this.canvas.height = h;
  }

  start() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('could not create drawing context');

    document.addEventListener('keydown', ev => this.keyInput(ev, true));
    document.addEventListener('keyup', ev => this.keyInput(ev, false));

    this.playing = false;

    const loop = () => {
      requestAnimationFrame(loop);

      this.update();
      this.draw(ctx);
    };
    requestAnimationFrame(loop);
  }

  init() {
    this.player = new Player();
    this.aliens = [];
    this.lasers = [];
    this.shotCooldown = 0;

    this.score = 0;
    this.lives = 5;
  }

  /**
   * @param {KeyboardEvent} ev
   * @param {boolean} state
   */
  keyInput(ev, state) {
    if (this.playing)
      switch (ev.key.toLowerCase()) {
        case 'a':
          this.player.left = state;
          break;
        case 's':
          this.player.right = state;
          break;
        case ' ':
          if (state) {
            this.shoot();
          }
          break;
      }
    else if (ev.key === 'Enter') {
      this.playing = true;
      this.init();
    }
  }

  shoot() {
    if (this.shotCooldown <= 0) {
      this.lasers.push(
        new Laser(this.player.x + 50, this.player.y, 0, -5)
      );
      this.shotCooldown = 15;
    }
  }

  update() {
    if ('getGamepads' in navigator) {
      const gamepads = navigator.getGamepads();
      if (gamepads.length > 0) {
        const gamepad = gamepads[0];
        if (this.playing) {
          if (gamepad.buttons[0].pressed) {
            this.shoot();
          }
          const value = gamepad.axes[0];
          this.player.left = value < -0.2;
          this.player.right = value > 0.2;
        } else {
          if (gamepad.buttons[9].pressed) {
            this.playing = true;
            this.init();
          }
        }
      }
    }

    if (!this.playing) return;

    if (this.aliens.length === 0)
      for (let x = 0; x < 8; x++)
        for (let y = 0; y < 4; y++)
          this.aliens.push(new Alien(50 * x + 10, 50 * y + 10));

    if (this.aliens.some(alien => alien.x <= 5 || alien.x >= 755))
      this.aliens.forEach(alien => {
        alien.velX *= -1;
        alien.y += 10;
      });
    this.aliens.forEach(alien => alien.update());
    this.aliens.forEach(alien => {
      if (Math.random() * 2000 < 1)
        this.lasers.push(new Laser(alien.x + 20, alien.y + 40, 0, 5));
    });

    this.lasers.forEach(laser => laser.update());
    this.lasers = this.lasers.filter(laser => {
      if (laser.y < -5 || laser.y > h) return false;
      if (this.aliens.some(alien => alien.isHit(laser))) {
        this.aliens = this.aliens.filter(alien => !alien.isHit(laser));
        this.score++;
        return false;
      }
      if (this.player.isHit(laser)) {
        this.lives--;
        if (this.lives <= 0) this.playing = false;
        return false;
      }
      return true;
    });

    this.player.update();

    this.shotCooldown--;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, w, h);

    if (!this.playing) {
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '64px sans-serif';
      ctx.fillText('Space Invaders', w / 2, h / 3);
      ctx.font = '32px sans-serif';
      ctx.fillText(
        `Your score: ${typeof this.score === 'number' ? this.score : '-'}`,
        w / 2,
        h / 2
      );
      ctx.fillText('Press Enter or Start (10) to begin', w / 2, h * 2 / 3);
      return;
    }

    this.player.draw(ctx);
    this.aliens.forEach(alien => alien.draw(ctx));
    this.lasers.forEach(laser => laser.draw(ctx));

    ctx.fillStyle = 'white';
    ctx.font = '20px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${this.score}`, 10, 10);
    ctx.fillText(`Lives: ${this.lives}`, 10, 30);
  }
}
