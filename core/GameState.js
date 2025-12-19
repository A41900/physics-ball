export function createGameState(initial = "playing") {
  let state = initial;
  const listeners = {};

  function get() {
    return state;
  }

  function set(next) {
    if (state === next) return;
    state = next;
    emit(next);
  }

  function on(event, fn) {
    (listeners[event] ||= []).push(fn);
  }

  function emit(event) {
    listeners[event]?.forEach((fn) => fn());
  }

  return {
    get,
    set,
    on,
  };
}
