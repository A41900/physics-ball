import Level from "../world/Level.js";
import Player from "../entities/Player.js";
import Collision from "../systems/Collision.js";
import { createInput } from "../systems/input.js";
import { CONFIG } from "../config.js";
import Time from "./Time.js";
import GameState from "./GameState.js";
import MusicManager from "./MusicManager.js";
import { THEMES } from "../themes/index.js";
import RenderSystem from "../systems/RenderSystem.js";

export default class Game {
  constructor(gameEl) {
    this.gameEl = gameEl;
    this.world = { x: 0 };
    this.input = createInput();

    this.theme = THEMES.arcade;
    this.applyTheme();

    this.player = new Player(
      200,
      200,
      CONFIG.player.width,
      CONFIG.player.height,
      this.theme
    );

    this.entities = {
      player: this.player,
      // platforms: this.level.platforms,
      // obstacles: this.level.obstacles,
    };

    this.level = new Level(1, gameEl);
    this.level.load();
    this.collisions = new Collision(gameEl, this.level);

    this.music = new MusicManager();
    this.started = false;
    this.time = new Time();
    this.screenBottom = this.gameEl.clientHeight;

    this.overlay = document.getElementById("game-overlay");
    this.overlayText = document.getElementById("overlay-text");

    this.state = new GameState();

    this.state.on("playing", () => {
      this.music.resume();
    });

    this.state.on("paused", () => {
      this.music.pause();
    });

    this.state.on("gameover", () => {
      this.music.play("death");
    });

    this.state.on("levelover", () => {
      this.music.play("victory");
    });
  }
  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(time) {
    const dt = this.time.delta(time);

    this.handleInput();

    switch (this.state.get()) {
      case "gameover":
        this.showGameOver();
        break;

      case "paused":
        this.showOnPause();
        break;

      case "levelover":
        this.updateSimulation(dt);
        this.showLevelOver();
        break;

      case "playing":
        this.updateSimulation(dt);
        this.checkTransitions();
        this.hideOverlay();
        break;
    }

    this.render();
    this.input.update();
    requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    RenderSystem(this.world, this.entities, this.theme, this.gameEl);
    this.level.render(this.world.x);
  }

  checkTransitions() {
    if (this.playerIsDead()) {
      this.state.setGameOver();
      return;
    }
    this.levelIsComplete();
  }

  updateSimulation(dt) {
    if (!this.cameraStops()) {
      this.world.x += CONFIG.world.speed * dt;
    }

    this.player.update(this.input, dt);
    this.collisions.resolvePlayer(this.player);
  }

  handleInput() {
    if (this.input.any && !this.started) {
      this.started = true;
      this.music.unlock();
      this.music.play("arcade");
      return; //  evita pause no mesmo frame
    }

    if (this.input.justPressed("space")) {
      this.state.togglePause();
    }
  }

  /*vou migrar para GAME_UI maybe*/

  showGameOver() {
    this.overlay.classList.remove("hidden");
    this.overlayText.textContent = "GAME OVER";
  }

  showOnPause() {
    this.overlay.classList.remove("hidden");
    this.overlayText.textContent = "GAME PAUSED";
  }

  showLevelOver() {
    this.overlay.classList.remove("hidden");
    this.overlayText.textContent = "LEVEL UP :)";
  }

  hideOverlay() {
    this.overlay.classList.add("hidden");
  }

  playerIsDead() {
    const screenX = this.player.x - this.world.x;
    const offLeft = screenX + this.player.width < -this.level.deathX;
    const offBottom = this.player.y > this.level.deathY;
    return offLeft || offBottom;
  }

  cameraStops() {
    return this.world.x >= this.level.endX;
  }

  levelIsComplete() {
    // verificar colisão com GOAL
    const reachedGoal = this.level.obstacles.some(
      (obstacle) => obstacle.type === "goal" && obstacle.hits(this.player)
    );
    if (reachedGoal) {
      this.state.setLevelOver();
      return true;
    }
    return false;
  }

  applyTheme() {
    const bg = this.theme.background;
    this.gameEl.style.background = `url("${bg.image}") ${bg.position} / ${bg.size} no-repeat`;
  }
}
