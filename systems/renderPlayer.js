export default function renderPlayer(player, world, theme, gameEl) {
  // Criar DOM (apenas uma vez)
  if (!player.el) {
    player.el = document.createElement("div");
    player.el.id = "player";
    player.el.style.width = player.width + "px";
    player.el.style.height = player.height + "px";

    const img = document.createElement("img");
    img.draggable = false;

    player.el.appendChild(img);
    gameEl.appendChild(player.el);
  }

  // Obter sprite element
  const img = player.el.querySelector("img");

  // Escolher sprite COM BASE NO ESTADO LÓGICO
  const sprite =
    theme.player.sprites[player.state] ?? theme.player.sprites.idle;

  img.src = sprite;

  // Aplicar flip visual
  const flip = player.facing === "left" ? -1 : 1;
  img.style.transform = `translateX(-50%) scaleX(${flip})`;

  // Posicionar no mundo
  player.el.style.left = player.x - world.x + "px";
  player.el.style.top = player.y + "px";
}
