/// <reference path="./minesweeper.js" />
/// <reference path="./ai.js" />

const aiOnly = true;

const canvas = document.createElement('canvas');
document.getElementById('container').appendChild(canvas);

const ctx = canvas.getContext('2d');

const game = new Minesweeper(ctx);
const ai = new AI(game);

game.start();
ai.start();
