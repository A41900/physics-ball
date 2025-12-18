import renderPlayer from "./renderPlayer.js";
//import renderPlatforms from "./renderPlatforms.js";
//import renderObstacles from "./renderObstacles.js";

export default function RenderSystem(world, entities, theme, gameEl) {
  renderPlayer(entities.player, world, theme, gameEl);
  /*renderPlatforms(entities.platforms, world, theme, gameEl);
  renderObstacles(entities.obstacles, world, theme, gameEl);*/
}
