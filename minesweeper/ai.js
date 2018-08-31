class AI {
  /**
   * @param {Minesweeper} game
   */
  constructor(game) {
    this.game = game;

    this.step = this.step.bind(this);
  }

  start() {
    setInterval(this.step, 100);
  }

  step() {
    if (this.flag() || this.clickRandomly()) {
      this.game.draw();
    }
  }

  flag() {
    const game = this.game;

    for (let x = 0; x < game.cols; x++) {
      for (let y = 0; y < game.rows; y++) {
        const i = game.index(x, y);
        const value = game.tiles[i];

        if (value >= 0) {
          let neighboors = 0;

          for (let offX = -1; offX <= 1; offX++) {
            for (let offY = -1; offY <= 1; offY++) {
              const newX = x + offX;
              const newY = y + offY;
              if (
                newX >= 0 &&
                newX < game.cols &&
                newY >= 0 &&
                newY < game.rows
              ) {
                if (game.tiles[game.index(newX, newY)] < 0) {
                  neighboors++;
                }
              }
            }
          }

          if (neighboors <= value) {
            for (let offX = -1; offX <= 1; offX++) {
              for (let offY = -1; offY <= 1; offY++) {
                const newX = x + offX;
                const newY = y + offY;
                if (
                  newX >= 0 &&
                  newX < game.cols &&
                  newY >= 0 &&
                  newY < game.rows
                ) {
                  if (game.tiles[game.index(newX, newY)] === -1) {
                    game.toggleFlag(newX, newY);
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }

    return false;
  }

  clickRandomly() {
    const game = this.game;

    /** @type{[number, number][]} */
    const empty = [];
    for (let x = 0; x < game.cols; x++) {
      for (let y = 0; y < game.rows; y++) {
        const i = game.index(x, y);
        const value = game.tiles[i];
        if (value === -1) {
          empty.push([x, y]);
        }
      }
    }

    if (empty.length <= 0) return false;

    const chosen = empty[Math.floor(empty.length * Math.random())];
    game.uncover(...chosen);

    return true;
  }
}
