import Obstacle from "../entities/Obstacle.js";
import Platform from "../entities/Platform.js";

export default class Level {
  constructor(levelNumber, gameEl) {
    console.log("GAME CONSTRUCTOR");
    this.id = levelNumber;
    this.gameEl = gameEl;
    this.platforms = Level.createPlatforms(levelNumber);
    this.obstacles = Level.createObstacles(levelNumber);
    this.endX = 1000;
    this.deathX = 40;
    this.deathY = gameEl.clientHeight + 40;
    this.levelOverTimer = 0;
  }

  // limpar do DOM tb
  destroy() {
    this.platforms.forEach((p) => {
      p.el?.remove();
      p.el = null;
    });

    this.obstacles.forEach((o) => {
      o.el?.remove();
      o.el = null;
    });

    this.platforms.length = 0;
    this.obstacles.length = 0;
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
      case 2:
        return [
          // início — mesma zona da primeira
          new Platform(130, 300, 130, 10),

          // sequência em zigue-zague
          new Platform(280, 250, 120, 10),
          new Platform(450, 320, 140, 10),

          // subida progressiva
          new Platform(650, 260, 120, 10),
          new Platform(820, 210, 120, 10),

          // pausa larga (salto mais longo)
          new Platform(1050, 260, 180, 12),

          // descida rápida
          new Platform(1280, 330, 120, 10),
          new Platform(1450, 380, 120, 10),

          // final mais alto (prepara o goal)
          new Platform(1650, 300, 160, 12),
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
      case 2:
        return [
          new Obstacle({
            x: 1700, // um pouco depois da última plataforma
            y: 300 - 160, // em cima / alinhado visualmente
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

export function createLevel(id, gameEl) {
  return new Level(id, gameEl);
}
