const speed = 8;

export class Paddle {
  /**
   * Creates a new paddle
   * @param {number} x The x coordinate of the paddle
   */
  constructor(x) {
    this.x = x;
    this.y = 250;
    this.w = 5;
    this.h = 100;
    this.up = false;
    this.down = false;
  }

  /**
   * Update the paddle's position
   */
  update() {
    if (this.up) this.y -= speed;
    if (this.down) this.y += speed;

    if (this.y < 0) this.y = 0;
    if (this.y > 500) this.y = 500;
  }

  /**
   * Draw the paddle to the canvas
   * @param {CanvasRenderingContext2D} ctx The 2d context to draw to
   */
  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
