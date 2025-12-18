import Level from "../world/Level.js";
import Player from "../entities/Player.js";
import Collision from "../systems/Collision.js";
import { createInput } from "../systems/input.js";
import { CONFIG } from "../config.js";
import Time from "./Time.js";
import GameState from "./GameState.js";

export default class Game {
  constructor(gameEl) {
    this.gameEl = gameEl;
    this.world = { x: 0 };
    this.input = createInput();

    this.player = new Player(
      200,
      200,
      CONFIG.player.width,
      CONFIG.player.height
    );
    this.player.attach(gameEl);

    this.level = new Level(1, gameEl);
    this.level.load();

    this.collisions = new Collision(gameEl, this.level);

    this.time = new Time();

    this.music = new Audio("./assets/arcade.wav");
    this.musicStarted = false;
    this.music.loop = true;
    this.music.volume = 0.2;

    this.overlay = document.getElementById("game-overlay");
    this.overlayText = document.getElementById("overlay-text");

    this.state = new GameState();
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(time) {
    const dt = this.time.delta(time);

    if (this.input.justPressed("space")) {
      this.state.triggerPause();
    }

    if (this.state.gameOver) {
      this.showGameOver();
    } else if (this.state.paused) {
      this.showOnPause();
    } else {
      this.hideOverlay();
      this.update(dt);
    }

    this.render();
    this.input.update();
    requestAnimationFrame(this.loop.bind(this));
  }

  update(dt) {
    this.handleMusic();

    this.world.x += CONFIG.world.speed * dt;
    this.player.update(this.input, dt);
    this.collisions.resolvePlayer(this.player);

    if (this.checkGameOver()) {
      this.state.triggerGameOver();
      this.music.pause();
    }
  }

  render() {
    this.level.render(this.world.x);
    this.player.render(this.world.x);
  }

  checkGameOver() {
    const screenX = this.player.x - this.world.x;
    return screenX + this.player.width <= 0;
  }

  showGameOver() {
    this.overlay.classList.remove("hidden");
    this.overlayText.textContent = "GAME OVER";
  }

  startMusic() {
    if (!this.musicStarted) {
      this.music.play();
      this.musicStarted = true;
    }
  }

  handleMusic() {
    if (this.input.any && !this.musicStarted) {
      this.music.play();
      this.musicStarted = true;
    }
  }

  showOnPause() {
    this.overlay.classList.remove("hidden");
    this.overlayText.textContent = "GAME PAUSED";
  }

  hideOverlay() {
    this.overlay.classList.add("hidden");
  }
}
