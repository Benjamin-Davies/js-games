import Terrain, { BlockType } from './terrain.js';
import { clamp, magSq } from './math.js';

export const gravity = 0.01,
  bounceDecayFactor = 0.8,
  slideDecayFactor = 0.8,
  jumpSpeed = 0.2,
  slideSpeed = 0.1;

export default class {
  /**
   * Create a new player
   * @param {number} x The player's X coordinate
   * @param {number} y The player's Y coordinate
   */
  constructor(x = 2, y = 0) {
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;

    this.jump = false;
    this.left = false;
    this.right = false;
  }

  /**
   * Update the player
   * @param {Terrain} terrain Terrain to collide with
   */
  update(terrain) {
    let collision = false;

    for (let x = Math.floor(this.x); x < this.x + 1; x++)
      for (let y = Math.floor(this.y); y < this.y + 1; y++) {
        const block = terrain.getBlock(x, y);
        if (block !== BlockType.Air) {
          // https://stackoverflow.com/a/1879223
          // Center of the circle
          const centerX = this.x + 0.5;
          const centerY = this.y + 0.5;
          // Closest point in the square to the center
          const closestX = clamp(centerX, x, x + 1);
          const closestY = clamp(centerY, y, y + 1);
          // Calculate distance between
          const distanceX = centerX - closestX;
          const distanceY = centerY - closestY;
          const distanceSq = magSq(distanceX, distanceY);
          // Compare
          if (distanceSq <= 0.25) {
            // Yay we intersect
            collision = true;

            if (this.jump) this.velY = -jumpSpeed;
            else if (this.velY > 0) this.velY *= -bounceDecayFactor;

            this.velX *= slideDecayFactor;
          }
        }
      }

    if (collision) {
      if (this.right) this.velX = slideSpeed;
      else if (this.left) this.velX = -slideSpeed;
    } else this.velY += gravity;

    this.x += this.velX;
    this.y += this.velY;
  }

  /**
   * Draw the player
   * @param {CanvasRenderingContext2D} ctx The context to draw to
   */
  draw(ctx) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x + 0.5, this.y + 0.5, 0.5, 0, Math.PI * 2);
    ctx.fill();

    if (window.debug) {
      ctx.lineWidth = 0.1;
      ctx.strokeStyle = 'lime';
      for (let x = Math.floor(this.x); x < this.x + 1; x++)
        for (let y = Math.floor(this.y); y < this.y + 1; y++)
          ctx.strokeRect(x, y, 1, 1);
      ctx.strokeStyle = 'red';
      ctx.strokeRect(Math.round(this.x), Math.round(this.y), 1, 1);
    }
  }
}
