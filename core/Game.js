import Level from "../world/Level.js";
import Player from "../entities/Player.js";
import Collision from "../systems/Collision.js";
import { createInput } from "../systems/input.js";
import { CONFIG } from "../config.js";
import Time from "./Time.js";
import { createGameState } from "./GameState.js";
import { createMusicManager } from "./MusicManager.js";
import { THEMES } from "../themes/index.js";
import RenderSystem from "../systems/RenderSystem.js";
import { createGameUI } from "./GameUI.js";
import { createRules } from "./GameRules.js";

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

    this.level = new Level(1, gameEl);
    this.collisions = new Collision(gameEl, this.level);

    this.entities = {
      player: this.player,
      platforms: this.level.platforms,
      obstacles: this.level.obstacles,
    };

    this.rules = createRules({
      player: this.player,
      world: this.world,
      level: this.level,
    });

    this.music = createMusicManager();
    this.state = createGameState();

    this.started = false;
    this.time = new Time();
    this.screenBottom = this.gameEl.clientHeight;

    this.gameUI = createGameUI();

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

    this.state.on("gameover", this.gameUI.showGameOver);
    this.state.on("paused", this.gameUI.showPause);
    this.state.on("playing", this.gameUI.hide);
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(time) {
    const dt = this.time.delta(time);

    this.handleInput();

    const state = this.state.get();

    if (state === "playing" || state === "levelover") {
      this.updateSimulation(dt);
    }

    if (state === "playing") {
      this.checkTransitions(dt);
    }

    RenderSystem(this.world, this.entities, this.theme, this.gameEl);
    this.input.update();
    requestAnimationFrame(this.loop.bind(this));
  }

  checkTransitions(dt) {
    if (this.rules.playerIsDead()) {
      this.state.setGameOver();
    }

    if (this.rules.levelCompleted()) {
      this.state.setLevelOver();
    }

    if (!this.rules.cameraShouldStop()) {
      this.world.x += CONFIG.world.speed * dt;
    }
  }

  updateSimulation(dt) {
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

  applyTheme() {
    const bg = this.theme.background;
    this.gameEl.style.background = `url("${bg.image}") ${bg.position} / ${bg.size} no-repeat`;
  }
}
