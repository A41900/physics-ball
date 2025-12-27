export function createMainMenu() {
  const panel = document.querySelector("#menu-panel");
  const buttons = document.querySelectorAll("[data-action]");
  const handlers = {};

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      handlers[action]?.();
    });
  });

  return {
    on(action, cb) {
      handlers[action] = cb;
    },
    show() {
      panel.classList.remove("hidden");
    },
    hide() {
      panel.classList.add("hidden");
    },
  };
}
