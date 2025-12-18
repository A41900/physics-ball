export default class MusicManager {
  constructor() {
    this.unlocked = false;
    this.current = null;

    this.tracks = {
      arcade: new Audio("./assets/arcade.wav"),
      death: new Audio("./assets/death.mp3"),
      victory: new Audio("./assets/victory.wav"),
    };

    this.tracks.arcade.loop = true;
    this.tracks.arcade.volume = 0.2;
    this.tracks.death.volume = 0.2;
    this.tracks.victory.volume = 0.2;
  }

  unlock() {
    this.unlocked = true;
  }

  play(name) {
    if (!this.unlocked) return;

    const track = this.tracks[name];
    if (!track) return;

    if (this.current === track) return;

    this.stop();
    this.current = track;
    track.currentTime = 0;
    track.play();
  }

  resume() {
    if (this.current && this.unlocked) {
      this.current.play();
    }
  }

  pause() {
    if (this.current) {
      this.current.pause();
    }
  }

  stop() {
    if (this.current) {
      this.current.pause();
      this.current.currentTime = 0;
      this.current = null;
    }
  }
}
