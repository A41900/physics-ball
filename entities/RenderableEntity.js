import Entity from "./Entity.js";

export default class RenderableEntity extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.el = null;
  }

  render(worldX) {
    if (!this.el) return;
    this.el.style.left = this.x - worldX + "px";
    this.el.style.top = this.y + "px";
  }

  attach(parent) {
    if (this.el) parent.appendChild(this.el);
  }
}
