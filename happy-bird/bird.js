const gravity = 0.2,
  jump = 5;

export class Bird {
  constructor() {
    this.x = 0;
    this.y = 240;
    this.velX = 5;
    this.velY = 0;
  }

  /**
   * Update the bird's position
   */
  update() {
    this.velY += gravity;
    this.velY = Math.min(this.velY, 10);

    this.x += this.velX;
    this.y += this.velY;
  }

  flap() {
    this.velY = -jump;
  }

  /**
   * Draw the bird onto a canvas
   * @param {CanvasRenderingContext2D} ctx The 2d context to draw to
   */
  draw(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}
