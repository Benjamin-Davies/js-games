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

    this.onMouseDown = this.onMouseDown.bind(this);
  }

  start() {
    this.mines = Array(this.cols * this.rows).fill(false);
    let n = 0;
    while (n < this.mineCount) {
      const i = Math.floor(this.cols * this.rows * Math.random());
      if (!this.mines[i]) {
        this.mines[i] = true;
        n++;
      }
    }

    this.tiles = Array(this.cols * this.rows).fill(-1);

    const canvas = this.ctx.canvas;
    canvas.addEventListener('mousedown', this.onMouseDown);

    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    const cellSize = this.cellSize;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();
    ctx.scale(cellSize, cellSize);
    ctx.lineWidth = 0.1;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '1px monospace';

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const i = this.index(x, y);
        const value = this.tiles[i];

        ctx.save();
        ctx.translate(x, y);

        switch (value) {
          case -1:
            ctx.strokeRect(0, 0, 1, 1);
            break;
          case 0:
            break;
          default:
            ctx.fillText(value, 0.5, 0.5);
            break;
        }

        ctx.restore();
      }
    }

    ctx.restore();
  }

  /**
   * @param {MouseEvent} ev
   */
  onMouseDown(ev) {
    ev.preventDefault;

    const canvas = this.ctx.canvas;
    const pixelX = ev.clientX - canvas.offsetLeft;
    const pixelY = ev.clientY - canvas.offsetTop;

    const cellSize = this.cellSize;
    const x = Math.floor(pixelX / cellSize);
    const y = Math.floor(pixelY / cellSize);

    this.uncover(x, y);
    this.draw();
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  uncover(x, y) {
    const i = this.index(x, y);
    if (this.mines[i]) {
      console.log('Hit a mine');
      return;
    } else if (this.tiles[i] < 0) {
      let neighbooringMines = 0;

      for (let offX = -1; offX <= 1; offX++) {
        for (let offY = -1; offY <= 1; offY++) {
          const newX = x + offX;
          const newY = y + offY;
          if (newX >= 0 && newX < this.cols && newY >= 0 && newY < this.rows) {
            if (this.mines[this.index(newX, newY)]) {
              neighbooringMines++;
            }
          }
        }
      }

      console.log(neighbooringMines);
      this.tiles[i] = neighbooringMines;
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  index(x, y) {
    return x + y * this.cols;
  }

  get cellSize() {
    return Math.min(
      ctx.canvas.width / this.cols,
      ctx.canvas.height / this.rows
    );
  }
}
