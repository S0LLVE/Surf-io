export class GameLoop {
  constructor(update, render) {
    this.update = update;
    this.render = render;
    this.animationId = null;
    this.lastTime = 0;
    this.running = false;
  }

  start() {
    if (this.running) return;

    this.running = true;
    this.lastTime = performance.now();
    this.animationId = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  tick = (currentTime) => {
    if (!this.running) return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    this.animationId = requestAnimationFrame(this.tick);
  };
}
