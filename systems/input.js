export function createInput() {
  const input = {
    // estado atual
    left: false,
    right: false,
    jump: false,
    space: false,
    any: false,

    // estado anterior (privado por convenção)
    _prev: {
      left: false,
      right: false,
      jump: false,
      space: false,
    },

    // -------- EDGE DETECTION --------
    justPressed(key) {
      return this[key] && !this._prev[key];
    },

    justReleased(key) {
      return !this[key] && this._prev[key];
    },

    // -------- CHAMAR UMA VEZ POR FRAME --------
    update() {
      this._prev.left = this.left;
      this._prev.right = this.right;
      this._prev.jump = this.jump;
      this._prev.space = this.space;
    },
  };

  window.addEventListener("keydown", (e) => {
    input.any = true;
    if (e.code === "ArrowLeft") input.left = true;
    if (e.code === "ArrowRight") input.right = true;
    if (e.code === "ArrowUp") input.jump = true;
    if (e.code === "Space") input.space = true;
  });

  window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") input.left = false;
    if (e.code === "ArrowRight") input.right = false;
    if (e.code === "ArrowUp") input.jump = false;
    if (e.code === "Space") input.space = false;
  });

  return input;
}
