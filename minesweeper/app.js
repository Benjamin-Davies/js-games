const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.getElementById('container').appendChild(canvas);

const ctx = canvas.getContext('2d');

const game = new Minesweeper(ctx, 100, 100, 10);
game.start();
