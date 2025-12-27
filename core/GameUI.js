export function createGameUI(root = document) {
  const overlay = root.getElementById("game-overlay");
  const overlayText = root.getElementById("overlay-text");

  function show(text) {
    overlay.classList.remove("hidden");
    overlayText.textContent = text;
  }

  function hide() {
    overlay.classList.add("hidden");
    root.getElementById("settings-panel").classList.add("hidden");
  }

  return {
    showGameOver: () => {
      show("GAME OVER");
      root.getElementById("");
    },
    showPause: () => {
      show("GAME PAUSED");
      root.getElementById("settings-panel").classList.remove("hidden");
    },
    showLevelOver: () => show("LEVEL UP :)"),
    hide,
  };
}
