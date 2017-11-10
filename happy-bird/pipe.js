const w = 80,
  gapSize = 80;

export class Pipe {
  constructor(x, y) {
    this.x = x;
    this.holeTop = y - gapSize;
    this.holeBottom = y + gapSize;
  }

  collides(bird) {
    const r = 20;
    return (
      this.x < bird.x + r &&
      this.x + w > bird.x - r &&
      (bird.y - r < this.holeTop || bird.y + r > this.holeBottom)
    );
  }

  /**
   * Draw the pipe to a canvas
   * @param {CanvasRenderingContext2D} ctx The context to draw to
   */
  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, 0, w, this.holeTop);
    ctx.fillRect(this.x, this.holeBottom, w, 480 - this.holeBottom);
  }
}
