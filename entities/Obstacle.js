import RenderableEntity from "./RenderableEntity.js";

export default class Obstacle extends RenderableEntity {
  constructor(x, y, size) {
    super(x, y, size, size);

    this.el = document.createElement("div");
    this.el.className = "obstacle";
    this.el.style.width = size + "px";
    this.el.style.height = size + "px";
  }

  hits(player) {
    return this.intersects(player);
  }
}
