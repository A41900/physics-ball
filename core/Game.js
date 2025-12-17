import Level from "../world/Level.js";
import Player from "../entities/Player.js";
import Collision from "../systems/Collision.js";
import { createInput } from "../systems/input.js";
import { CONFIG } from "../config.js";
import Time from "../core/Time.js";

export default class Game {
  constructor(gameEl) {
    this.gameEl = gameEl;
    this.world = { x: 0 };
    this.input = createInput();

    this.player = new Player(200, 200, CONFIG.player.width, CONFIG.player.height);
    this.player.attach(gameEl);

    this.level = new Level(1, gameEl);
    this.level.load();

    this.collisions = new Collision(gameEl, this.level);

    this.running = true;
    this.time = new Time();

    this.music = new Audio("./assets/arcade.wav");
    this.musicStarted = false;
    this.music.loop = true;
    this.music.volume = 0.2;

  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(time) {
    if (!this.running) return;
    const dt = this.time.delta(time);
    this.update(dt);
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }


  
  update(dt) {

    if (this.input.any && !this.musicStarted) {
      this.music.play();
      this.musicStarted = true;
    }

    this.world.x += CONFIG.world.speed * dt;
    this.player.update(this.input, dt);
    this.collisions.resolvePlayer(this.player);

    if (this.checkGameOver()) {
      this.music.pause();
      this.running = false;
    }
  }

  render() {
    this.level.render(this.world.x);
    this.player.render(this.world.x);
  }

  checkGameOver() {
    const screenX = this.player.x - this.world.x;
    if (screenX + this.player.width <= 0) {
      document.getElementById("game-over-box")
        .classList.remove("hidden");
      return true;
    }
    return false;
  }
  startMusic() {
  if (!this.musicStarted) {
    this.music.play();
    this.musicStarted = true;
  }
}


}

