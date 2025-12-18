import renderPlayer from "./renderPlayer.js";
import renderPlatform from "./renderPlatform.js";
import renderObstacle from "./renderObstacle.js";

export default function RenderSystem(world, entities, theme, gameEl) {
  renderPlayer(entities.player, world, theme, gameEl);

  entities.platforms.forEach((p) => renderPlatform(p, world, theme, gameEl));

  entities.obstacles.forEach((o) => renderObstacle(o, world, theme, gameEl));
}
