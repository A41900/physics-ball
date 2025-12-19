import Level from "../world/Level.js";
import Player from "../entities/Player.js";
import Collision from "../systems/Collision.js";
import { createInput } from "../systems/input.js";
import { CONFIG } from "../config.js";
import Time from "./Time.js";
import { createGameState } from "./GameState.js";
import { createMusicManager } from "./MusicManager.js";
import { THEMES } from "../themes/index.js";
import { renderSystem, applyTheme } from "../systems/RenderSystem.js";
import { createGameUI } from "./GameUI.js";
import { createRules } from "./GameRules.js";
import { setupGameEvents } from "./setupGameEvents.js";

export default class Game {
  constructor(gameEl) {
    this.gameEl = gameEl;
    this.world = { x: 0 };

    this.input = createInput();

    this.theme = THEMES.arcade;
    applyTheme(this.theme, this.gameEl);

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
    this.gameUI = createGameUI();
    this.musicStarted = false;
    this.time = new Time();

    setupGameEvents(this.state, this.music, this.gameUI);
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

    renderSystem(this.world, this.entities, this.theme, this.gameEl);
    this.input.update();
    requestAnimationFrame(this.loop.bind(this));
  }

  checkTransitions(dt) {
    if (this.rules.playerIsDead()) {
      this.state.set("gameover");
    }

    if (this.rules.levelCompleted()) {
      this.state.set("levelover");
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
    if (this.input.any && !this.musicStarted) {
      this.musicStarted = true;
      this.music.unlock();
      this.music.play("arcade");
      return; //  evita pause no mesmo frame
    }
    if (this.input.justPressed("space")) {
      const current = this.state.get();
      this.state.set(current === "paused" ? "playing" : "paused");
    }
  }
}
