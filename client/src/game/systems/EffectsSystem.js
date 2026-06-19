import { createParticlesForWave } from '../effects/particleFactory.js';

export class EffectsSystem {
  constructor() {
    this.processedWaveIds = new Set();
  }

  update(state, deltaTime) {
    this.spawnFromCollectedWaves(state);
    this.cleanupProcessedIds(state);
    this.updateParticles(state, deltaTime);
  }

  spawnFromCollectedWaves(state) {
    for (const wave of state.waves) {
      if (!wave.collected || this.processedWaveIds.has(wave.id)) {
        continue;
      }

      this.processedWaveIds.add(wave.id);
      state.particles.push(...createParticlesForWave(wave));
    }
  }

  cleanupProcessedIds(state) {
    const activeWaveIds = new Set(state.waves.map((wave) => wave.id));

    for (const waveId of this.processedWaveIds) {
      if (!activeWaveIds.has(waveId)) {
        this.processedWaveIds.delete(waveId);
      }
    }
  }

  updateParticles(state, deltaTime) {
    state.particles = state.particles.filter((particle) => {
      particle.elapsed += deltaTime;
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      if (particle.kind === 'bubble') {
        particle.vy -= 0.000015 * deltaTime;
      }

      return particle.elapsed < particle.duration;
    });
  }
}
