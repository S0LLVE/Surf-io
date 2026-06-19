import { colors } from '../../styles/tokens/colors.js';

export function drawSurfer(ctx, surfer) {
  const centerX = surfer.x + surfer.width / 2;

  ctx.fillStyle = colors.surfer;
  ctx.beginPath();
  ctx.ellipse(centerX, surfer.y + surfer.height * 0.75, surfer.width * 0.6, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillRect(surfer.x + surfer.width * 0.35, surfer.y + surfer.height * 0.2, surfer.width * 0.3, surfer.height * 0.55);

  ctx.beginPath();
  ctx.arc(centerX, surfer.y + surfer.height * 0.15, surfer.width * 0.2, 0, Math.PI * 2);
  ctx.fill();
}
