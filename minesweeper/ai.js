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
    const game = this.game;

    for (let x = 0; x < game.cols; x++) {
      for (let y = 0; y < game.rows; y++) {
        const i = game.index(x, y);

if (game.tiles[i]>=0){
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
              if (game.tiles[game.index(newX,newY)]===){

              }
            }
          }}
        }
      }
    }

    game.uncover(
      Math.floor(game.cols * Math.random()),
      Math.floor(game.rows * Math.random())
    );

    game.draw();
  }
}
