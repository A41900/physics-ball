export default class GameState {
  constructor() {
    this.state = "playing";
  }

  // usado no switch(this.state.get())
  get() {
    return this.state;
  }

  // usado em handleInput()
  togglePause() {
    if (this.state === "gameover") return;

    if (this.state === "paused") {
      this.state = "playing";
    } else if (this.state === "playing") {
      this.state = "paused";
    }
  }

  // usado em checkTransitions()
  setGameOver() {
    this.state = "gameover";
  }

  // usado em checkTransitions()
  setLevelOver() {
    this.state = "levelover";
  }

  // usado em updateSimulation()
  isLevelOver() {
    return this.state === "levelover";
  }
}
