import { CanvasRenderer, drawBackground } from '../renderer/CanvasRenderer.js';
import { drawSurfer } from '../renderer/drawSurfer.js';
import { drawWave } from '../renderer/drawWave.js';

export class RenderSystem {
  constructor(ctx, width, height) {
    this.renderer = new CanvasRenderer(ctx, width, height);
  }

  update(state) {
    const { ctx, width, height } = this.renderer;

    this.renderer.clear();
    drawBackground(ctx, width, height);

    for (const wave of state.waves) {
      drawWave(ctx, wave);
    }

    drawSurfer(ctx, state.surfer);
  }
}
