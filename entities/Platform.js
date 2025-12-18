import RenderableEntity from "./RenderableEntity.js";

export default class Platform extends RenderableEntity {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.el = document.createElement("div");
    this.el.className = "platform";
    this.el.style.width = width + "px";
    this.el.style.height = height + "px";
    this.sprite = document.createElement("img");
    this.sprite.src = "assets/cloud.png";
    this.sprite.draggable = false;
    this.el.appendChild(this.sprite);
  }

  canPlayerLand(player) {
    if (player.vy <= 0) return false;
    const crossedTop =
      player.bottom - player.vy <= this.top && player.bottom >= this.top;
    return crossedTop && this.intersects(player);
  }
}
