export function setupGameEvents(state, music, ui) {
  state.on("playing", () => {
    music.resume();
    ui.hideAll();
  });
  state.on("paused", () => {
    music.pause();
    ui.showPause();
  });

  state.on("levelover", () => {
    music.play("victory");
    ui.showLevelOver();
  });

  state.on("gameover", () => {
    music.play("death");
    ui.showGameOver();
  });

  state.on("idle", () => {
    music.pause();
    ui.hideAll();
  });
}
