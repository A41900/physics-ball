export default class Collision {
  constructor(gameEl, level) {
    this.gameEl = gameEl;
    this.level = level;
  }

  resolvePlayer(player) {
    player.onGround = false;
    this.resolvePlatformCollisions(player);
    this.resolveGroundCollision(player);
  }

  resolvePlatformCollisions(player) {
    this.level.platforms.forEach((platform) => {
      if (platform.canPlayerLand(player)) {
        player.y = platform.top - player.height;
        player.vy = 0;
        player.onGround = true;
      }
    });
  }

  resolveGroundCollision(player) {
    const groundY = this.gameEl.clientHeight - player.height;
    if (player.y >= groundY) {
      player.y = groundY;
      player.vy = 0;
      player.onGround = true;
    }
  }
}
