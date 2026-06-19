import { CanvasRenderer, drawBackground } from '../renderer/CanvasRenderer.js';
import { drawSurfer } from '../renderer/drawSurfer.js';
import { drawWave } from '../renderer/drawWave.js';
import { drawFloatingTexts } from '../renderer/drawFloatingText.js';
import { drawParticles } from '../renderer/drawParticles.js';

export class RenderSystem {
  constructor(ctx, width, height, sprites) {
    this.renderer = new CanvasRenderer(ctx, width, height);
    this.sprites = sprites;
    this.startTime = performance.now();

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
  }

  update(state) {
    const { ctx, width, height } = this.renderer;
    const time = performance.now() - this.startTime;

    this.renderer.clear();
    drawBackground(ctx, width, height, time);

    for (const wave of state.waves) {
      drawWave(ctx, wave, this.sprites, time);
    }

    drawParticles(ctx, state.particles);
    drawSurfer(ctx, state.surfer, this.sprites, time);
    drawFloatingTexts(ctx, state.floatingTexts);
  }
}
