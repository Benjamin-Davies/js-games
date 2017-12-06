import Terrain, { BlockType } from './terrain.js';
export const gravity = 0.01,
  bounceDecayFactor = 0.8,
  slideDecayFactor = 0.8,
  jumpSpeed = 0.2,
  sideSpeed = 0.1;

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
          if (this.y < y && this.velY > 0) {
            if (this.jump) this.velY = -jumpSpeed;
            else {
              this.velX *= slideDecayFactor;
              this.velY *= -bounceDecayFactor;
            }

            if (this.right) this.velX = sideSpeed;
            if (this.left) this.velX = -sideSpeed;
          } else if (this.y > y && this.velY < 0)
            this.velY *= -bounceDecayFactor;

          collision = true;
        }
      }

    if (!collision) this.velY += gravity;

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
