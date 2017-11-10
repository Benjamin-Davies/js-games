export class Alien {
  constructor(x = 5, y = 5) {
    this.x = x;
    this.y = y;

    this.velX = 2;
  }

  update() {
    this.x += this.velX;
  }

  isHit(laser) {
    return (
      laser.velY < 0 &&
      this.x < laser.x + 5 &&
      this.x + 40 > laser.x &&
      this.y < laser.y + 5 &&
      this.y + 40 > laser.y
    );
  }

  /**
   * Draws the player to a canvas
   * @param {CanvasRenderingContext2D} ctx The context to draw to
   */
  draw(ctx) {
    ctx.save();

    ctx.fillStyle = 'white';
    ctx.translate(this.x, this.y);

    ctx.fillRect(10, 0, 20, 5);
    ctx.fillRect(5, 5, 30, 10);
    ctx.fillRect(5, 20, 30, 5);
    ctx.fillRect(0, 10, 5, 25);
    ctx.fillRect(35, 10, 5, 25);
    ctx.fillRect(5, 35, 5, 5);
    ctx.fillRect(30, 35, 5, 5);

    ctx.restore();
  }
}
