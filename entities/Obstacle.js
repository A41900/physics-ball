import RenderableEntity from "./RenderableEntity.js";
export default class Obstacle extends RenderableEntity {
  constructor({ x, y, width, height, sprite, type = "hazard" }) {
    super(x, y, width, height);

    this.type = type;

    this.el = document.createElement("div");
    this.el.className = `obstacle obstacle-${type}`;
    this.el.style.width = width + "px";
    this.el.style.height = height + "px";

    this.sprite = document.createElement("img");
    this.sprite.src = sprite;
    this.sprite.draggable = false;

    this.el.appendChild(this.sprite);
  }

  hits(player) {
    return this.intersects(player);
  }
}
