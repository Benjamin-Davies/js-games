class Minesweeper {
  /**
   * Create a new instance of the minesweeper game
   * @param {CanvasRenderingContext2D} ctx The context to draw onto
   */
  constructor(ctx) {
    this.ctx = ctx;

    this.onMouseDown = this.onMouseDown.bind(this);
  }

  start() {
    const canvas = this.ctx.canvas;
    canvas.addEventListener('mousedown', this.onMouseDown);
    canvas.addEventListener('mouseup', ev => ev.preventDefault());
    canvas.addEventListener('contextmenu', ev => ev.preventDefault());

    this.reset();
    this.draw();
  }

  reset() {
    this.cols = Math.floor(window.innerWidth * 0.05);
    this.rows = Math.floor(window.innerHeight * 0.05);
    this.mineCount = Math.floor(this.rows * this.cols * 0.1);

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
    this.gameOver = false;
  }

  draw() {
    const ctx = this.ctx;
    const cellSize = this.cellSize;

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'lightgrey';
    ctx.strokeStyle = 'white';

    if (this.gameOver) {
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '32px sans-serif';
      ctx.fillText(
        'Game Over!',
        this.ctx.canvas.width * 0.5,
        this.ctx.canvas.height * 0.5
      );
      ctx.font = '24px sans-serif';
      ctx.fillText(
        'Click to play again.',
        this.ctx.canvas.width * 0.5,
        this.ctx.canvas.height * 0.75
      );
      ctx.restore();
    } else {
      ctx.save();
      ctx.scale(cellSize, cellSize);
      ctx.lineWidth = 0.05;
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
            case -2:
              ctx.fillStyle = 'red';
              ctx.beginPath();
              ctx.arc(0.5, 0.5, 0.3, 0, 2 * Math.PI);
              ctx.fill();
              break;
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
  }

  /**
   * @param {MouseEvent} ev
   */
  onMouseDown(ev) {
    ev.preventDefault();

    if (this.gameOver || aiOnly) {
      this.reset();
    } else {
      const canvas = this.ctx.canvas;
      const pixelX = ev.clientX - canvas.offsetLeft;
      const pixelY = ev.clientY - canvas.offsetTop;

      const cellSize = this.cellSize;
      const x = Math.floor(pixelX / cellSize);
      const y = Math.floor(pixelY / cellSize);

      switch (ev.button) {
        case 0:
          this.uncover(x, y);
          break;
        case 2:
          this.toggleFlag(x, y);
          break;
      }
    }

    this.draw();
  }

  /**
   * @param {number} startX
   * @param {number} startY
   */
  uncover(startX, startY) {
    const queue = [[startX, startY]];

    while (queue.length > 0) {
      const [x, y] = queue.pop();
      const i = this.index(x, y);

      if (this.mines[i]) {
        this.gameOver = true;
        return;
      } else if (this.tiles[i] < 0) {
        let neighbooringMines = 0;

        for (let offX = -1; offX <= 1; offX++) {
          for (let offY = -1; offY <= 1; offY++) {
            const newX = x + offX;
            const newY = y + offY;
            if (
              newX >= 0 &&
              newX < this.cols &&
              newY >= 0 &&
              newY < this.rows
            ) {
              if (this.mines[this.index(newX, newY)]) {
                neighbooringMines++;
              }
            }
          }
        }

        this.tiles[i] = neighbooringMines;

        if (neighbooringMines === 0) {
          for (let offX = -1; offX <= 1; offX++) {
            for (let offY = -1; offY <= 1; offY++) {
              const newX = x + offX;
              const newY = y + offY;
              if (
                newX >= 0 &&
                newX < this.cols &&
                newY >= 0 &&
                newY < this.rows
              ) {
                if (this.tiles[this.index(newX, newY)] < 0) {
                  queue.unshift([newX, newY]);
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  toggleFlag(x, y) {
    const i = this.index(x, y);

    if (this.tiles[i] < 0) {
      if (this.tiles[i] === -1) {
        this.tiles[i] = -2;
      } else {
        this.tiles[i] = -1;
      }
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
