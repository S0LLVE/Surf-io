import { colors } from '../../styles/tokens/colors.js';

export class CanvasRenderer {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

export function drawBackground(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, colors.ocean);
  gradient.addColorStop(1, colors.oceanDeep);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}
