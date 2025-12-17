export default class Time {
  constructor() {
    this.last = performance.now();
  }

  delta(now) {
    const dt = (now - this.last) / 1000;
    this.last = now;
    return dt;
  }
}
