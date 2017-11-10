const w = 100,
  h = 50,
  speed = 7;

export class Player {
  constructor() {
    this.x = 350;
    this.y = 500;

    this.left = false;
    this.right = false;
  }

  update() {
    if (this.left) this.x -= speed;
    if (this.right) this.x += speed;

    if (this.x < 0) this.x = 0;
    if (this.x > 800 - w) this.x = 800 - w;
  }

  isHit(laser) {
    return (
      laser.velY > 0 &&
      this.x < laser.x + 5 &&
      this.x + 100 > laser.x &&
      this.y < laser.y + 5 &&
      this.y + 50 > laser.y
    );
  }

  /**
   * Draws the player to a canvas
   * @param {CanvasRenderingContext2D} ctx The context to draw to
   */
  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, w, h);
  }
}
