const game = document.querySelector("#game");
const playerEl = document.querySelector("#player");

// =======================
// PLAYER
// =======================
const player = {
  size: 12,
  x: 200,
  y: 50,
  vx: 0,
  vy: 0,
  onGround: false,
};

// =======================
// MASSA
// =======================
const MASS = player.size / 16;

// =======================
// CONSTANTES
// =======================
const GRAVITY = 0.25 * MASS;
const JUMP_FORCE = -5 / Math.sqrt(MASS);

const MAX_RUN_SPEED = 3.5;
const ACCEL = 0.35 / MASS;
const DECEL = 0.30 / MASS;

// =======================
// INPUT
// =======================
const keys = new Set();
let jumpRequested = false;

window.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") {
    jumpRequested = true;
  }

  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    keys.add(e.key);
  }
});

window.addEventListener("keyup", e => {
  keys.delete(e.key);
});

// =======================
// LOOP
// =======================
function update() {
  const groundY = game.clientHeight - player.size;

  // -------- TARGET SPEED --------
  let targetVx = 0;

  if (keys.has("ArrowLeft")) targetVx = -MAX_RUN_SPEED;
  if (keys.has("ArrowRight")) targetVx = MAX_RUN_SPEED;

  // -------- MOVIMENTO LEVE --------
  if (player.vx < targetVx) {
    player.vx += ACCEL;
    if (player.vx > targetVx) player.vx = targetVx;
  }

  if (player.vx > targetVx) {
    player.vx -= DECEL;
    if (player.vx < targetVx) player.vx = targetVx;
  }

  // -------- SALTO (EVENTO) --------
  if (jumpRequested && player.onGround) {
    player.vy = JUMP_FORCE;
    player.onGround = false;
  }
  jumpRequested = false;

  // -------- GRAVIDADE --------
  player.vy += GRAVITY;

  // -------- MOVIMENTO --------
  player.x += player.vx;
  player.y += player.vy;

  // -------- CHÃO --------
  if (player.y >= groundY) {
    player.y = groundY;
    player.vy = 0;
    player.onGround = true;
  }

  // -------- LIMITES --------
  if (player.x < 0) {
    player.x = 0;
    player.vx = 0;
  }

  if (player.x > game.clientWidth - player.size) {
    player.x = game.clientWidth - player.size;
    player.vx = 0;
  }

  // -------- RENDER --------
  playerEl.style.width = player.size + "px";
  playerEl.style.height = player.size + "px";
  playerEl.style.left = player.x + "px";
  playerEl.style.top = player.y + "px";

  requestAnimationFrame(update);
}

update();
