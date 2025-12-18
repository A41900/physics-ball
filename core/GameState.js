export default class GameState {
  constructor() {
    this.state = "playing";
  }

  isPlaying() {
    return this.state === "playing";
  }

  isPaused() {
    return this.state === "paused";
  }

  isGameOver() {
    return this.state === "gameover";
  }

  togglePause() {
    if (this.state === "gameover") return;

    this.state = this.state === "paused" ? "playing" : "paused";
  }

  setGameOver() {
    this.state = "gameover";
  }

  reset() {
    this.state = "playing";
  }
}
