export function createGameState() {
  let state = "playing";
  const listeners = {};

  function get() {
    return state;
  }

  function on(event, fn) {
    (listeners[event] ||= []).push(fn);
  }

  function emit(event) {
    listeners[event]?.forEach((fn) => fn());
  }

  function set(newState) {
    if (state === newState) return;
    state = newState;
    emit(state);
  }

  function togglePause() {
    if (state !== "playing" && state !== "paused") return;
    set(state === "paused" ? "playing" : "paused");
  }

  function setGameOver() {
    if (state === "gameover") return;
    set("gameover");
  }

  function setLevelOver() {
    if (state === "levelover") return;
    set("levelover");
  }

  function isLevelOver() {
    return state === "levelover";
  }

  return {
    get,
    on,
    togglePause,
    setGameOver,
    setLevelOver,
    isLevelOver,
  };
}
