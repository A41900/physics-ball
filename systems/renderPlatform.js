export default function renderPlatform(platform, world, theme, gameEl) {
  // criar DOM uma vez
  if (!platform.el) {
    platform.el = document.createElement("div");
    platform.el.className = "platform";
    platform.el.style.width = platform.width + "px";
    platform.el.style.height = platform.height + "px";

    const sprite = document.createElement("img");
    sprite.draggable = false;
    sprite.src = theme.platform.sprite;

    platform.el.appendChild(sprite);
    gameEl.appendChild(platform.el);
  }

  platform.el.style.left = platform.x - world.x + "px";
  platform.el.style.top = platform.y + "px";
}
