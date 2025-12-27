export function createMainMenu() {
  const el = document.querySelector("#menu-panel");
  const handlers = {};

  el.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;
    handlers[action]?.();
  });

  return {
    show() {
      el.classList.remove("hidden");
    },
    hide() {
      el.classList.add("hidden");
    },
    on(action, cb) {
      handlers[action] = cb;
    },
  };
}
