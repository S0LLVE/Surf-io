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

export function drawBackground(ctx, width, height, time = 0) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#0096C7');
  gradient.addColorStop(0.45, colors.ocean);
  gradient.addColorStop(1, colors.oceanDeep);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const surfaceGlow = ctx.createLinearGradient(0, 0, 0, height * 0.35);
  surfaceGlow.addColorStop(0, 'rgba(202, 240, 248, 0.18)');
  surfaceGlow.addColorStop(1, 'rgba(202, 240, 248, 0)');

  ctx.fillStyle = surfaceGlow;
  ctx.fillRect(0, 0, width, height * 0.35);

  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 2;

  for (let i = 0; i < 4; i += 1) {
    const baseY = ((i * 140 + time * 0.025) % (height + 80)) - 40;
    ctx.beginPath();
    ctx.moveTo(0, baseY);

    for (let x = 0; x <= width; x += 40) {
      const waveY = baseY + Math.sin((x + time * 0.04) * 0.02 + i) * 6;
      ctx.lineTo(x, waveY);
    }

    ctx.stroke();
  }

  ctx.restore();
}
