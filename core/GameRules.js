export function createRules({ player, world, level }) {
  return {
    playerIsDead() {
      const screenX = player.x - world.x;
      //console.log("SCREEN X : " + screenX + "level" + level.deathX);
      return screenX + player.width < -level.deathX || player.y > level.deathY;
    },

    levelCompleted() {
      return level.obstacles.some((o) => o.type === "goal" && o.hits(player));
    },

    cameraShouldStop() {
      return world.x >= level.endX;
    },
  };
}
