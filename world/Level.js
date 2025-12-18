import Obstacle from "../entities/Obstacle.js";
import Platform from "../entities/Platform.js";

export default class Level {
  constructor(levelNumber, gameEl) {
    this.gameEl = gameEl;
    this.platforms = Level.createPlatforms(levelNumber);
    this.obstacles = Level.createObstacles(levelNumber);
    this.endX = 900;
  }

  load() {
    this.platforms.forEach((p) => p.attach(this.gameEl));
    this.obstacles.forEach((p) => p.attach(this.gameEl));
  }

  render(worldX) {
    this.platforms.forEach((p) => p.render(worldX));
    this.obstacles.forEach((p) => p.render(worldX));
  }

  destroy() {
    this.platforms.forEach((p) => p.el.remove());
    this.platforms = [];
  }

  static createPlatforms(levelNumber) {
    switch (levelNumber) {
      case 1:
        return [
          new Platform(260, 380, 130, 10),
          new Platform(420, 340, 130, 10),
          new Platform(650, 280, 160, 12),
          new Platform(650, 200, 160, 12),
          new Platform(650, 90, 160, 12),
          new Platform(950, 160, 160, 12),
          new Platform(1150, 120, 160, 12),
          new Platform(1300, 400, 160, 12),
          new Platform(1380, 420, 160, 12),
        ];

      default:
        console.warn("Level não existe:", levelNumber);
        return [];
    }
  }

  static createObstacles(levelNumber) {
    switch (levelNumber) {
      case 1:
        return [
          new Obstacle({
            x: 1500,
            y: 450,
            width: 100,
            height: 100,
            sprite: "assets/castle.png",
            type: "goal",
          }),
        ];

      default:
        console.warn("Level não existe:", levelNumber);
        return [];
    }
  }
}
