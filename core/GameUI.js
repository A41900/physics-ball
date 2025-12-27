export function createGameUI(root = document) {
  const overlay = root.getElementById("overlay");
  const sections = overlay.querySelectorAll("section");

  function showSection(id) {
    hideAll();
    overlay.classList.remove("hidden");
    document.getElementById(id).classList.remove("hidden");
  }

  function hideAll() {
    overlay.classList.add("hidden");
    sections.forEach((e) => e.classList.add("hidden"));
  }

  return {
    showPause: () => showSection("pausePanel"),
    showGameOver: () => showSection("gameoverPanel"),
    showLevelOver: () => showSection("leveloverPanel"),
    hideAll: () => hideAll(),
  };
}
