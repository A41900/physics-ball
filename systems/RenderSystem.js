export function renderSystem(
  gameEl,
  world,
  player,
  platforms,
  obstacles,
  theme
) {
  const entities = {
    player: player,
    platforms: platforms,
    obstacles: obstacles,
  };
  renderEntity(player, world, theme, gameEl);
  entities.platforms.forEach((p) => renderEntity(p, world, theme, gameEl));
  entities.obstacles.forEach((o) => renderEntity(o, world, theme, gameEl));
}

export function applyTheme(theme, gameEl) {
  const bg = theme.background;
  gameEl.style.background = `url("${bg.image}") ${bg.position} / ${bg.size} no-repeat`;
}

function renderEntity(entity, world, theme, gameEl) {
  if (!entity.el) {
    entity.el = document.createElement("div");
    entity.el.className = entity.name; // "player", "platform", "obstacle"

    entity.el.style.width = entity.width + "px";
    entity.el.style.height = entity.height + "px";

    const img = document.createElement("img");
    img.draggable = false;

    entity.el.appendChild(img);
    gameEl.appendChild(entity.el);
  }

  renderVisual(entity, theme);

  positionInWorld(entity, world.x);
}

function positionInWorld(entity, worldX) {
  entity.el.style.left = entity.x - worldX + "px";
  entity.el.style.top = entity.y + "px";
}

function renderVisual(entity, theme) {
  const img = entity.el.querySelector("img");

  if (entity.name === "player") {
    img.src = theme.player.sprites[entity.state] ?? theme.player.sprites.idle;
    const flip = entity.facing === "left" ? -1 : 1;
    img.style.transform = `scaleX(${flip})`;
  } else if (entity.name === "platform") {
    img.src = theme.platform.sprite;
  } else if (entity.name.includes("obstacle")) {
    img.src = theme.obstacle[entity.type]?.sprite;
  }
}
