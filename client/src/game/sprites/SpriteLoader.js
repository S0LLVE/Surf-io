import { SPRITE_KEYS, SPRITE_SOURCES } from './spriteKeys.js';

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load sprite: ${src}`));
    image.src = src;
  });
}

export class SpriteLoader {
  static async loadAll() {
    const entries = Object.entries(SPRITE_SOURCES);
    const loadedSprites = await Promise.all(
      entries.map(async ([key, src]) => [key, await loadImage(src)]),
    );

    return Object.fromEntries(loadedSprites);
  }
}

export { SPRITE_KEYS };
