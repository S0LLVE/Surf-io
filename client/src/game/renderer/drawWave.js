import { colors } from '../../styles/tokens/colors.js';

export function drawWave(ctx, wave) {
  ctx.fillStyle = colors.wave;
  ctx.beginPath();
  ctx.arc(wave.x + wave.radius, wave.y + wave.radius, wave.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.foam;
  ctx.beginPath();
  ctx.arc(wave.x + wave.radius - 4, wave.y + wave.radius - 4, wave.radius * 0.25, 0, Math.PI * 2);
  ctx.fill();
}
