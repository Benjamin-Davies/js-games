class Minesweeper {
  /**
   * Create a new instance of the minesweeper game
   * @param {CanvasRenderingContext2D} ctx The context to draw onto
   * @param {number} cols The number of columns
   * @param {number} rows The number of rows
   * @param {number} mineCount The number of mines
   */
  constructor(ctx, cols, rows, mineCount) {
    this.ctx = ctx;
    this.cols = cols;
    this.rows = rows;
    this.mineCount = mineCount;

    this.mines = Array(this.cols * this.rows).fill(false);
    let n = 0;
    while (n < this.mineCount) {
      const x = Math.floor(this.cols);
    }
  }

  start() {
    draw();
  }

  draw() {}
}
