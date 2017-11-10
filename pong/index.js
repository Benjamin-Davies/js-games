import { Ball } from './ball.js';
import { Paddle } from './paddle.js';

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const paddle1 = new Paddle(50);
const paddle2 = new Paddle(745);
const ball = new Ball();

let player1Score = 0,
  player2Score = 0;

const drawScores = () => {
  ctx.fillStyle = 'white';
  ctx.font = '32px monospace';
  ctx.textBaseline = 'top';

  ctx.textAlign = 'right';
  ctx.fillText(player1Score, 390, 10);

  ctx.textAlign = 'center';
  ctx.fillText(':', 400, 10);

  ctx.textAlign = 'left';
  ctx.fillText(player2Score, 410, 10);
};

const draw = () => {
  requestAnimationFrame(draw);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 600);

  paddle1.update();
  paddle2.update();
  ball.update();
  if (ball.velX < 0 && ball.collidesWith(paddle1)) {
    ball.velX *= -1;
    ball.velY *= 1.1;
  }
  if (ball.velX > 0 && ball.collidesWith(paddle2)) {
    ball.velX *= -1;
    ball.velY *= 1.1;
  }

  if (ball.x > 800) {
    player1Score++;
    ball.reset(true);
  }
  if (ball.x < 0) {
    player2Score++;
    ball.reset();
  }

  paddle1.draw(ctx);
  paddle2.draw(ctx);
  ball.draw(ctx);
  drawScores();
};
draw();

const controls = state => ev => {
  switch (ev.key.toLowerCase()) {
    case 'q':
      paddle1.up = state;
      break;
    case 'a':
      paddle1.down = state;
      break;
    case 'p':
      paddle2.up = state;
      break;
    case ';':
    case ':':
      paddle2.down = state;
      break;
  }
};
document.addEventListener('keydown', controls(true));
document.addEventListener('keyup', controls(false));
