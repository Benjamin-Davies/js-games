export class Ninja {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;

    this.hp = 20;
  }

  update() {
    this.velY += 1;
    if (this.y >= 500) this.velX /= 1.1;

    this.x += this.velX;
    this.y += this.velY;

    if (this.y < 0) {
      this.velY = Math.max(this.velY, 0);
      this.y = 0;
    }
    if (this.y > 500) {
      this.velY = Math.min(this.velY, 0);
      this.y = 500;
    }
    if ((this.x < 0 && this.velX < 0) || (this.x > 700 && this.velX > 0)) {
      this.x = Math.min(Math.max(0, this.x), 700);
      this.velX *= -0.7;
    }
  }

  repelFrom(ninja, ignoreDist) {
    const dx = this.x - ninja.x,
      dy = this.y - ninja.y,
      distSq = dx * dx + dy * dy;

    if (distSq < 2500 || ignoreDist) {
      const scale = Math.pow(distSq, -0.5) * (ignoreDist ? 20 : 5);
      if (scale === Infinity || !scale) return;
      this.velX += dx * scale;
      this.velY += dy * scale;
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx 
   * @param {HTMLImageElement} img 
   */
  draw(ctx, img) {
    if (this.hp <= 0) return;

    if (this.velX <= 0) ctx.drawImage(img, this.x, this.y);
    else {
      ctx.save();
      ctx.translate(this.x + 50, this.y + 50);
      ctx.scale(-1, 1);
      ctx.drawImage(img, -50, -50);
      ctx.restore();
    }
  }
}
