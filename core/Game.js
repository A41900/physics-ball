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
import { createRules } from "./GameRules.js";
import { createLevel } from "../world/Level.js";

export default class Game {
  constructor(gameEl) {
    this.gameEl = gameEl;
    this.world = { x: 0 };
    this.theme = THEMES.arcade;
    applyTheme(this.theme, this.gameEl);
    this.player = new Player(
      200,
      200,
      CONFIG.player.width,
      CONFIG.player.height,
      this.theme
    );
    this.input = createInput();
    this.levelId = 1;
    this.level = createLevel(this.levelId, this.gameEl);
    this.collisions = new Collision(gameEl, this.level);
    this.rules = createRules({
      player: this.player,
      world: this.world,
      level: this.level,
    });

    this.state = createGameState();
    this.music = createMusicManager();
    //this.musicStarted = false;
    this.time = new Time();
    this.running = true;
  }

  start() {
    this.running = true;
    requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    this.level.destroy();
    this.input.clear();
    //this.state.clear(); preciso do state idle :)
    this.running = false;
  }

  nextLevel() {
    this.level.destroy();
    this.levelId++;
    this.level = createLevel(this.levelId, this.gameEl);
  }

  loop(time) {
    if (!this.running) return;
    const dt = this.time.delta(time);
    this.handleInput();

    const state = this.state.get();
    console.log(state);

    if (state === "playing") {
      this.input.unlock();
    }

    if (state === "gameover") {
      this.input.lock();
    }

    if (state === "levelover") {
      this.input.lock();
      this.level.levelOverTimer += dt;

      if (this.level.levelOverTimer >= 5) {
        console.log("NEW LEVEL");
        this.nextLevel();
        this.world.x = 0;
        this.player.x = 200;
        this.player.y = 200;
        this.collisions = new Collision(this.gameEl, this.level);
        this.state.set("playing");
      }
    }

    if (state === "playing" || state === "levelover") {
      this.updateSimulation(dt);
    }

    if (state === "playing") {
      this.checkTransitions(dt);
    }

    renderSystem(
      this.gameEl,
      this.world,
      this.player,
      this.level.platforms,
      this.level.obstacles,
      this.theme
    );

    this.input.update();
    requestAnimationFrame(this.loop.bind(this));
  }

  checkTransitions(dt) {
    if (this.rules.playerIsDead()) {
      this.state.set("gameover");
      return;
    }
    if (this.rules.levelCompleted()) {
      this.state.set("levelover");
      //this.level.levelOverTimer = 0;
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
    if (this.input.justPressed("space")) {
      const current = this.state.get();

      if (current === "playing") {
        this.state.set("paused");
      } else if (current === "paused") {
        this.state.set("playing");
      }
    }
    if (this.input.justPressed("jump")) {
      // this.music.play("jump");
      //this.music.play()
    }
  }
}
