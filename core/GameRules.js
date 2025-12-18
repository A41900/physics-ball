export default class GameRules {
  static playerIsDead(game) {
    const screenX = game.player.x - game.world.x;
    return screenX + game.player.width <= 0;
  }

  static levelIsComplete(game) {
    return game.world.x >= game.level.endX;
  }
}
