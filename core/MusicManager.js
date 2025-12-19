export function createMusicManager() {
  let unlocked = false;
  let current = null;

  const tracks = {
    arcade: new Audio("assets/arcade.wav"),
    death: new Audio("assets/death.mp3"),
    victory: new Audio("assets/victory.wav"),
  };

  tracks.arcade.loop = true;

  Object.values(tracks).forEach((track) => {
    track.volume = 0.2;
  });

  function unlock() {
    if (unlocked) return;
    unlocked = true;
  }

  function play(name) {
    if (!unlocked) return;

    if (current) {
      current.pause();
      current.currentTime = 0;
    }

    current = tracks[name];
    if (!current) return;

    current.play();
  }

  function pause() {
    if (!current) return;
    current.pause();
  }

  function resume() {
    if (!current || !unlocked) return;
    current.play();
  }

  return {
    unlock,
    play,
    pause,
    resume,
  };
}
