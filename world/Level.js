import Obstacle from "../entities/Obstacle.js";
import Platform from "../entities/Platform.js";

export default class Level {
  constructor(levelNumber, gameEl) {
    console.log("GAME CONSTRUCTOR");
    this.id = levelNumber + 1;
    this.platforms = Level.createPlatforms(this.id);
    this.obstacles = Level.createObstacles(this.id);
    this.endX = 1000;
    this.deathX = 40;
    this.deathY = gameEl.clientHeight + 40;
    console.log(gameEl.clientHeight);
    console.log(this.deathX, this.deathY, this.endX);
  }

  destroy() {
    this.platforms = [];
    this.obstacles = [];
  }

  static createPlatforms(id) {
    switch (id) {
      case 1:
        return [
          new Platform(130, 300, 130, 10),
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

  static createObstacles(id) {
    switch (id) {
      case 1:
        return [
          new Obstacle({
            x: 1400,
            y: 400,
            width: 100,
            height: 160,
            type: "goal",
          }),
        ];

      default:
        console.warn("Level não existe:", levelNumber);
        return [];
    }
  }
}

export function loadNextLevel(x, gameEl) {
  const level = new Level(x, gameEl);
  const platforms = level.platforms;
  const obstacles = level.obstacles;
  const levelOverTimer = 0;

  const obj = {
    level: level,
    platforms: platforms,
    obstacles: obstacles,
    levelOverTimer: levelOverTimer,
  };

  return obj;
}
