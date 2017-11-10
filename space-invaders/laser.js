export class Laser {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} velX
   * @param {number} velY
   */
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }

  update() {
    this.x += this.velX;
    this.y += this.velY;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = this.velY < 0 ? 'blue' : 'pink';
    ctx.fillRect(this.x, this.y, 5, 5);
  }
}
