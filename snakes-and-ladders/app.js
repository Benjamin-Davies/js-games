// @ts-check

const darkCell = '#81C784', // green 300
  lightCell = '#C8E6C9', // green 100
  counterOutline = '#000', // black
  yellow = '#FFEB3B', // yellow
  blue = '#2196F3'; // blue

const TWO_PI = 2 * Math.PI;

const width = 500,
  height = 500,
  size = 50,
  center = size / 2,
  radius = size / 3,
  cols = Math.floor(width / size),
  rows = Math.floor(height / size),
  totalCells = cols * rows;

const getCellPos = n => {
  const y = Math.floor(n / cols);
  const x = y % 2 === 0 ? n % cols : cols - 1 - n % cols;
  return [x, y];
};

class Counter {
  /**
   * Create a new counter
   * @param {string} color The color of the counter
   */
  constructor(color) {
    this.color = color;
    this.reset();
  }

  /**
   * Reset the counter
   */
  reset() {
    this.pos = 0;
    this.mov = 0;
  }

  /**
   * Update the counter's position
   * @param {number} deltaPos Ammount to move by
   */
  updatePos(deltaPos) {
    if (this.mov > deltaPos) {
      this.pos += deltaPos;
      this.mov -= deltaPos;
    } else {
      this.pos += this.mov;
      this.mov = 0;
    }
    if (this.pos > totalCells - 1) this.pos = totalCells - 1;
  }

  /**
   * Simulate rolling a dice and move that many squares
   */
  roll() {
    this.mov += Math.floor(6 * Math.random() + 1);
  }
}

let yellowCounter = new Counter(yellow),
  blueCounter = new Counter(blue);

/**
 * @type {HTMLCanvasElement}
 */
// @ts-ignore
const canvas = document.getElementById('board'),
  rollBtn1 = document.getElementById('roll1'),
  rollBtn2 = document.getElementById('roll2'),
  replayBtn = document.getElementById('replay');

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');
if (!ctx) throw new Error('Could not create drawing context');

const drawCounter = pos => {
  const [x, y] = getCellPos(pos);
  ctx.strokeStyle = counterOutline;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(center + x * size, center + y * size, radius, 0, TWO_PI);
  ctx.fill();
  ctx.stroke();
};

let lastTime = 0;
const draw = () => {
  requestAnimationFrame(draw);

  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;
  const deltaPos = deltaTime / 1000 / 100;

  yellowCounter.updatePos(deltaPos);
  blueCounter.updatePos(deltaPos);

  ctx.save();
  ctx.translate(0, height);
  ctx.scale(1, -1);

  ctx.fillStyle = lightCell;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = darkCell;
  ctx.beginPath();
  for (let x = 0; x < cols; x++)
    for (let y = 0; y < rows; y++)
      if ((x + y) % 2 === 0) ctx.rect(x * size, y * size, size, size);
  ctx.fill();

  ctx.fillStyle = blue;
  drawCounter(blueCounter.pos);
  ctx.fillStyle = yellow;
  drawCounter(
    yellowCounter.pos + (blueCounter.pos === yellowCounter.pos ? 0.1 : 0)
  );

  ctx.restore();
};

rollBtn1.addEventListener('click', () => yellowCounter.roll());
rollBtn2.addEventListener('click', () => blueCounter.roll());
replayBtn.addEventListener('click', () => {
  yellowCounter.reset();
  blueCounter.reset();
});

requestAnimationFrame(draw);
