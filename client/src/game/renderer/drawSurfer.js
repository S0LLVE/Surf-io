import { SPRITE_KEYS } from '../sprites/spriteKeys.js';
import { drawEllipseShadow, getFloatOffset } from './renderUtils.js';

const SURFER_DISPLAY_WIDTH = 60;
const SURFER_DISPLAY_HEIGHT = 90;

export function drawSurfer(ctx, surfer, sprites, time = 0) {
  const sprite = sprites[SPRITE_KEYS.SURFER];
  const floatY = getFloatOffset(time, 0.4);
  const baseCenterX = surfer.x + surfer.width / 2;
  const baseCenterY = surfer.y + surfer.height / 2;
  const drawX = baseCenterX - SURFER_DISPLAY_WIDTH / 2;
  const drawY = baseCenterY - SURFER_DISPLAY_HEIGHT / 2 + floatY;
  const shadowY = surfer.y + surfer.height - 3;

  drawEllipseShadow(ctx, baseCenterX, shadowY, surfer.width * 0.34, 5, 0.28);

  ctx.save();
  ctx.drawImage(sprite, drawX, drawY, SURFER_DISPLAY_WIDTH, SURFER_DISPLAY_HEIGHT);
  ctx.restore();
}
