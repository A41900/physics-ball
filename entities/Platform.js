import RenderableEntity from "./RenderableEntity.js";

export default class Platform extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  canPlayerLand(player) {
    if (player.vy <= 0) return false;
    const crossedTop =
      player.bottom - player.vy <= this.top && player.bottom >= this.top;
    return crossedTop && this.intersects(player);
  }
}
