import Platform from "../entities/Platform.js";

export default class Level {
  constructor(levelNumber, gameEl) {
    this.gameEl = gameEl;
    this.platforms = Level.createPlatforms(levelNumber);
    this.obstacles = [];
  }

  load() {
    this.platforms.forEach((p) => p.attach(this.gameEl));
  }

  render(worldX) {
    this.platforms.forEach((p) => p.render(worldX));
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
          new Platform(600, 300, 10, 200),
        ];

      default:
        console.warn("Level não existe:", levelNumber);
        return [];
    }
  }
}
