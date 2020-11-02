const w = 80;
const cells = 10;

const snakesAndLadders = [
  // [4, 17],
  // [18, 2],
  // [15, 31],
  // [36, 23],
  // [39, 45],
  // [43, 40],
];
for (let i = 0; i < 10; i++) {
  snakesAndLadders.push([
    Math.floor(cells * cells * Math.random()),
    Math.floor(cells * cells * Math.random()),
  ]);
}

class Player {
  constructor(color) {
    this.color = color;
    this.pos = 0;
  }

  roll() {
    this.die = Math.floor(1 + 6 * Math.random());
  }

  step() {
    if (this.pos >= cells * cells - 1) {
      this.pos = 0;
      return;
    }
    if (this.die--) {
      this.pos++;
      return true;
    }
  }

  checkJump() {
    while (true) {
      for (const [a, b] of snakesAndLadders) {
        if (this.pos === a) {
          this.pos = b;
          continue;
        }
      }
      break;
    }
  }

  draw() {
    const [row, col] = getCellPos(this.pos);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(col * w + w / 2, row * w + w / 2, 0.3 * w, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const canvas = document.createElement('canvas');
canvas.width = canvas.height = w * cells;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
const player1 = new Player('red');
const player2 = new Player('yellow');

function getCellPos(i) {
  const row = cells - 1 - Math.floor(i / cells);
  if (row % 2 === 0)
    return [row, i % cells];
  else
    return [row, cells - 1 - i % cells];
}

function draw() {
  ctx.clearRect(0, 0, w * cells, w * cells);

  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = '18px sans serif';
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.lineCap = 'square';
  for (let i = 0; i < cells * cells; i++) {
    const [row, col] = getCellPos(i);

    ctx.fillText(i + 1, 5 + col * w, 5 + row * w);
    ctx.strokeRect(col * w, row * w, w, w);
  }

  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  for (const [start, end] of snakesAndLadders) {
    if (start > end) {
      ctx.strokeStyle = 'blue';
    } else {
      ctx.strokeStyle = 'limegreen';
    }
    const [startR, startC] = getCellPos(start);
    const [endR, endC] = getCellPos(end);
    ctx.beginPath();
    ctx.moveTo(startC * w + w / 2, startR * w + w / 2);
    ctx.lineTo(endC * w + w / 2, endR * w + w / 2);
    ctx.stroke();
  }

  player1.draw();
  player2.draw();
}

draw();

let activePlayer = player1;
activePlayer.roll();

setInterval(() => {
  if (!activePlayer.step()) {
    activePlayer.checkJump();
    if (activePlayer === player1)
      activePlayer = player2;
    else
      activePlayer = player1;
    activePlayer.roll();
  }

  draw();
}, 500);
