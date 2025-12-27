export function createMusicManager() {
  let unlocked = false;
  let current = null;

  const tracks = {
    journey: new Audio("assets/journey.wav"),
    death: new Audio("assets/death.mp3"),
    victory: new Audio("assets/victory.wav"),
    jump: new Audio("assets/jump.mp3"),
  };

  tracks.journey.loop = true;

  Object.values(tracks).forEach((track) => {
    track.volume = 0.2;
  });

  function unlock() {
    if (unlocked) return;
    unlocked = true;

    // truque necessário para browsers
    Object.values(tracks).forEach((track) => {
      track.muted = true;
      track.play().catch(() => {});
      track.pause();
      track.currentTime = 0;
      track.muted = false;
    });
  }

  function play(name) {
    if (!unlocked) return;

    const next = tracks[name];
    if (!next) return;

    if (current && current !== next) {
      current.pause();
      current.currentTime = 0;
    }

    current = next;
    current.play();
  }

  function pause() {
    current?.pause();
  }

  function resume() {
    if (!unlocked) return;
    current?.play();
  }

  function isPlaying() {
    return !!current && !current.paused;
  }

  // efeitos sonoros (jump, etc)
  function sfx(name) {
    if (!unlocked) return;
    const sound = tracks[name];
    if (!sound) return;

    sound.currentTime = 0;
    sound.play();
  }

  return {
    unlock,
    play,
    pause,
    resume,
    isPlaying,
    sfx,
  };
}
