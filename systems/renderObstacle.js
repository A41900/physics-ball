export default function renderObstacle(obstacle, world, theme, gameEl) {
  // criar DOM uma vez
  if (!obstacle.el) {
    obstacle.el = document.createElement("div");
    obstacle.el.className = `obstacle obstacle-${obstacle.type}`;
    obstacle.el.style.width = obstacle.width + "px";
    obstacle.el.style.height = obstacle.height + "px";

    const img = document.createElement("img");
    img.draggable = false;

    obstacle.el.appendChild(img);
    gameEl.appendChild(obstacle.el);
  }
  const img = obstacle.el.querySelector("img");

  // escolher sprite via theme
  const sprite = theme.obstacle[obstacle.type]?.sprite;
  if (sprite) {
    img.src = sprite;
  }
  // posicionar no mundo
  obstacle.el.style.left = obstacle.x - world.x + "px";
  obstacle.el.style.top = obstacle.y + "px";
}
