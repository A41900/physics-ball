import Entity from "./Entity.js";

export default class Obstacle extends Entity {
  constructor({ x, y, width, height, type = "hazard" }) {
    super(x, y, width, height);
    this.type = type;
  }

  hits(player) {
    return this.intersects(player);
  }
}
