import { SPRITE_KEYS } from '../sprites/spriteKeys.js';
import { game } from '../../styles/tokens/game.js';
import { Entity } from './Entity.js';

export const WAVE_TYPES = {
  BLUE: 'blue',
  GOLD: 'gold',
  RED: 'red',
};

const TYPE_SPRITE = {
  [WAVE_TYPES.BLUE]: SPRITE_KEYS.WAVE_BLUE,
  [WAVE_TYPES.GOLD]: SPRITE_KEYS.WAVE_GOLD,
  [WAVE_TYPES.RED]: SPRITE_KEYS.WAVE_DANGER,
};

export class Wave extends Entity {
  constructor(x, y, type = WAVE_TYPES.BLUE) {
    const diameter = game.wave.radius * 2;
    super(x, y, diameter, diameter);

    const config = game.wave.types[type] ?? game.wave.types[WAVE_TYPES.BLUE];

    this.radius = game.wave.radius;
    this.type = type;
    this.points = config.points;
    this.collected = false;
    this.spriteKey = TYPE_SPRITE[type] ?? SPRITE_KEYS.WAVE_BLUE;
  }
}
