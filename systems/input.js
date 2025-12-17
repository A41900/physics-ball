export function createInput() {
  const input = {
    left: false,
    right: false,
    jump: false,
  };

  window.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") input.left = true;
    if (e.key === "ArrowRight") input.right = true;
    if (e.key === "ArrowUp") input.jump = true;
  });

  window.addEventListener("keyup", e => {
    if (e.key === "ArrowLeft") input.left = false;
    if (e.key === "ArrowRight") input.right = false;
  });

  return input;
}
