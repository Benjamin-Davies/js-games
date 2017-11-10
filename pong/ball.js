const speed = 5;

export class Ball {
  constructor() {
    this.reset();
  }

  /**
   * Reset the ball's position
   */
  reset(left) {
    this.x = 400;
    this.y = 300;

    const a = Math.random() - 0.5;
    this.velX = Math.cos(a) * speed * (left ? -1 : 1);
    this.velY = Math.sin(a) * speed;
  }

  /**
   * Update the ball's position
   */
  update() {
    this.x += this.velX;
    this.y += this.velY;

    if ((this.y < 0 && this.velY < 0) || (this.y > 600 && this.velY > 0))
      this.velY *= -1;
  }

  /**
   * Checks if the ball has collided with the paddle
   * @param {Paddle} paddle The paddle to check against
   */
  collidesWith(paddle) {
    return (
      paddle.x < this.x + 5 &&
      paddle.x + paddle.w > this.x - 5 &&
      paddle.y < this.y + 5 &&
      paddle.y + paddle.h > this.y - 5
    );
  }

  /**
   * Draw the ball to the canvas
   * @param {CanvasRenderingContext2D} ctx The 2d context to draw to
   */
  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x - 5, this.y - 5, 10, 10);
  }
}
