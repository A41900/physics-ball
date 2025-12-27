export function createGameState(initial = "idle") {
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

  function clear() {
    Object.keys(listeners).forEach((key) => {
      delete listeners[key];
    });
  }

  return {
    get,
    set,
    on,
    clear,
  };
}
