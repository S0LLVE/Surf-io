import { SPRITE_KEYS } from '../sprites/spriteKeys.js';
import { WAVE_TYPES } from '../entities/Wave.js';
import { drawEllipseShadow, getFloatOffset } from './renderUtils.js';

const TYPE_SPRITE = {
  [WAVE_TYPES.BLUE]: SPRITE_KEYS.WAVE_BLUE,
  [WAVE_TYPES.GOLD]: SPRITE_KEYS.WAVE_GOLD,
  [WAVE_TYPES.RED]: SPRITE_KEYS.WAVE_DANGER,
};

const WAVE_DISPLAY_SCALE = 1.3;

export function drawWave(ctx, wave, sprites, time = 0) {
  const spriteKey = wave.spriteKey ?? TYPE_SPRITE[wave.type] ?? SPRITE_KEYS.WAVE_BLUE;
  const sprite = sprites[spriteKey];
  const floatY = getFloatOffset(time, wave.id * 1.9);
  const baseCenterX = wave.x + wave.width / 2;
  const baseCenterY = wave.y + wave.height / 2;
  const visualWidth = wave.width * WAVE_DISPLAY_SCALE;
  const visualHeight = wave.height * WAVE_DISPLAY_SCALE;
  const drawX = baseCenterX - visualWidth / 2;
  const drawY = baseCenterY - visualHeight / 2 + floatY;
  const shadowY = wave.y + wave.height - 2;

  drawEllipseShadow(ctx, baseCenterX, shadowY, wave.radius * 0.62, 3.5, 0.24);

  ctx.save();
  ctx.drawImage(sprite, drawX, drawY, visualWidth, visualHeight);
  ctx.restore();
}
