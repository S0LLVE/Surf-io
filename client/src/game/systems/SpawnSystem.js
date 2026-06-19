import { Wave } from '../entities/Wave.js';
import { game } from '../../styles/tokens/game.js';
import { randomBetween } from '../utils/math.js';

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

    state.waves.push(new Wave(x - margin, y - margin));
  }
}
