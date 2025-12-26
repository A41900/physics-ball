export function setupGameEvents(state, music, ui) {
  state.on("playing", () => music.resume());
  state.on("paused", () => music.pause());
  state.on("gameover", () => music.play("death"));
  state.on("levelover", () => music.play("victory"));

  state.on("gameover", () => {
    ui.showGameOver();
    music.lock();
  });
  state.on("paused", ui.showPause);
  state.on("levelover", ui.showLevelOver);
  state.on("playing", ui.hide);
}
