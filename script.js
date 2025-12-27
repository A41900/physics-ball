import Game from "./core/Game.js";
import { createGameUI } from "./core/GameUI.js";
import { createMainMenu } from "./core/MainMenu.js";
import { setupGameEvents } from "./core/setupGameEvents.js";

const gameEl = document.querySelector("#game");
const ui = createGameUI();
const menu = createMainMenu();
let game = null;

menu.show();
menu.on("play", () => startGame());
//menu.on("restart", () => game?.reset());
//menu.on("exit", () => exitGame());
//menu.on("options", () => openOptions());
//menu.on("close", () => {});
menu.on("backToMenu", () => {
  game.stop();
  game.state.set("idle");
  menu.show();
});

function startGame() {
  console.log("ola");
  //game?.stop();
  menu.hide();

  game = new Game(gameEl);
  game.music.unlock();
  setupGameEvents(game.state, game.music, ui);
  game.state.set("playing");
  game.start();
}
