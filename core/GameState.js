export default class GameState {
  constructor() {
    this.paused = false;
    this.gameOver = false;
  }

  triggerPause() {
    if (this.gameOver) return;
    this.paused = !this.paused;
  }

  triggerGameOver() {
    this.gameOver = true;
    this.paused = true;
  }

  reset() {
    this.paused = false;
    this.gameOver = false;
  }
}
