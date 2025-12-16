import Level from "./Level.js";

// =======================
// DOM REFERENCES
// =======================
const game = document.querySelector("#game");
const playerEl = document.querySelector("#player");

// =======================
// CONFIG / CONSTANTS
// =======================
const CONFIG = {
  playerSize: 12,
  worldSpeed: 1,
  gravityBase: 0.25,
  jumpBase: -5,
  maxRunSpeed: 3.5,
  accelBase: 0.35,
  decelBase: 0.30,
};

// =======================
// WORLD STATE
// =======================
const world = {
  x: 0, // quanto o mundo já andou (offset)
};

// =======================
// PLAYER STATE
// =======================
const player = {
  x: 200,
  y: 50,
  vx: 0,
  vy: 0,
  size: CONFIG.playerSize,
  onGround: false,
};

// =======================
// DERIVED PHYSICS (dependem do tamanho)
// =======================
const MASS = player.size / 16;

const PHYSICS = {
  gravity: CONFIG.gravityBase * MASS,
  jumpForce: CONFIG.jumpBase / Math.sqrt(MASS),
  accel: CONFIG.accelBase / MASS,
  decel: CONFIG.decelBase / MASS,
};

// =======================
// INPUT STATE
// =======================
const input = {
  left: false,
  right: false,
  jumpRequested: false,
};

// =======================
// INPUT HANDLERS
// =======================
function setupInput() {
  window.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") input.left = true;
    if (e.key === "ArrowRight") input.right = true;
    if (e.key === "ArrowUp") input.jumpRequested = true;
  });

  window.addEventListener("keyup", e => {
    if (e.key === "ArrowLeft") input.left = false;
    if (e.key === "ArrowRight") input.right = false;
  });
}

// =======================
// WORLD LOGIC
// =======================
function updateWorld() {
  world.x += CONFIG.worldSpeed;
  level1.update(world.x);
}

// =======================
// PLAYER LOGIC
// =======================
function applyHorizontalMovement() {
  let targetVx = 0;

  if (input.left) targetVx = -CONFIG.maxRunSpeed;
  if (input.right) targetVx = CONFIG.maxRunSpeed;

  if (player.vx < targetVx) {
    player.vx += PHYSICS.accel;
    if (player.vx > targetVx) player.vx = targetVx;
  }

  if (player.vx > targetVx) {
    player.vx -= PHYSICS.decel;
    if (player.vx < targetVx) player.vx = targetVx;
  }
}

function applyJump() {
  if (input.jumpRequested && player.onGround) {
    player.vy = PHYSICS.jumpForce;
    player.onGround = false;
  }
  input.jumpRequested = false;
}

function applyGravity() {
  player.vy += PHYSICS.gravity;
}

function applyMovement() {
  player.x += player.vx;
  player.y += player.vy;
}

function handleGroundCollision() {
  const groundY = game.clientHeight - player.size;

  if (player.y >= groundY) {
    player.y = groundY;
    player.vy = 0;
    player.onGround = true;
  }
}


// =======================
// GAME RULES
// =======================
function checkGameOver() {
  const screenX = player.x - world.x;

  // morre quando a bola sai totalmente do ecrã à esquerda
  return screenX + player.size <= 0;
}

// =======================
// RENDER
// =======================
function renderPlayer() {
  playerEl.style.width = player.size + "px";
  playerEl.style.height = player.size + "px";
  playerEl.style.left = (player.x - world.x) + "px";
  playerEl.style.top = player.y + "px";
}

// =======================
// MAIN LOOP
// =======================
let running = true;

const level1 = new Level(1,game);
level1.load();


function update() {
  if (!running) return;

  updateWorld();

  applyHorizontalMovement();
  applyJump();
  applyGravity();
  applyMovement();

  player.onGround = false;       
  handlePlatformCollisions();
  handleGroundCollision();

  if (checkGameOver()) {
    triggerGameOver();
    return;
  }

  renderPlayer();
  requestAnimationFrame(update);
}

// =======================
// INIT
// =======================
setupInput();
update();

function triggerGameOver() {
  const gameover = document.getElementById("game-over-box");
  gameover.classList.remove("hidden");
}

function handlePlatformCollisions() {
  level1.platforms.forEach(platform => {
    if (platform.isPlayerLanding(player)) {
      player.y = platform.y - player.size;
      player.vy = 0;
      player.onGround = true;
    }
  });
}
