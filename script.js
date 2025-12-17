import Game from "./core/Game.js";

const gameEl = document.querySelector("#game");
const game = new Game(gameEl);
game.start();
