export default class GameState {
  constructor() {
    this.state = "playing";
    this.listeners = {};
  }

  // usado no switch(this.state.get())
  get() {
    return this.state;
  }

  on(event, fn) {
    (this.listeners[event] ||= []).push(fn);
  }

  emit(event) {
    this.listeners[event]?.forEach((fn) => fn());
  }

  // usado em handleInput()
  togglePause() {
    if (this.state !== "playing" && this.state !== "paused") return;

    this.state = this.state === "paused" ? "playing" : "paused";
    this.emit(this.state);
  }

  // usado em checkTransitions()
  setGameOver() {
    if (this.state === "gameover") return;
    this.state = "gameover";
    this.emit("gameover");
  }

  // usado em checkTransitions()
  setLevelOver() {
    if (this.state === "levelover") return;
    this.state = "levelover";
    this.emit("levelover");
  }

  // usado em updateSimulation()
  isLevelOver() {
    return this.state === "levelover";
  }
}
