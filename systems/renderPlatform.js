export default function renderPlatform(platform, world, theme, gameEl) {
  if (!platform.el) {
    platform.el = document.createElement("div");
    platform.el.className = "platform";
    obstacle.el.style.width = obstacle.width + "px";
    obstacle.el.style.height = obstacle.height + "px";

    const sprite = document.createElement("img");
    sprite.draggable = false;
    sprite.src = theme.platform.sprite;

    platform.el.appendChild(sprite);
    gameEl.appendChild(platform.el);
  }
  platform.el.style.left = platform.x - world.x + "px";
  platform.el.style.top = platform.y + "px";
}
