import { Wave, WAVE_TYPES } from '../entities/Wave.js';
import { game } from '../../styles/tokens/game.js';
import { randomBetween } from '../utils/math.js';

const SPAWN_ORDER = [WAVE_TYPES.BLUE, WAVE_TYPES.GOLD, WAVE_TYPES.RED];

function pickWaveType() {
  const roll = Math.random();
  let cumulative = 0;

  for (const type of SPAWN_ORDER) {
    cumulative += game.wave.types[type].weight;

    if (roll < cumulative) {
      return type;
    }
  }

  return WAVE_TYPES.BLUE;
}

export class SpawnSystem {
  constructor() {
    this.elapsed = 0;
  }

  update(state, deltaTime) {
    this.elapsed += deltaTime;

    if (this.elapsed < game.wave.spawnInterval) return;

    this.elapsed = 0;

    const margin = game.wave.radius;
    const x = randomBetween(margin, state.width - margin * 2);
    const y = randomBetween(margin, state.height - margin * 2);
    const type = pickWaveType();

    state.waves.push(new Wave(x - margin, y - margin, type));
  }
}
