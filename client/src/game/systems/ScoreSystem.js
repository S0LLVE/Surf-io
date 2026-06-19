import { game } from '../../styles/tokens/game.js';

export class ScoreSystem {
  update(state, onScoreChange) {
    const collectedWaves = state.waves.filter((wave) => wave.collected);

    if (collectedWaves.length === 0) return;

    state.score += collectedWaves.length * game.wave.points;
    state.waves = state.waves.filter((wave) => !wave.collected);

    if (onScoreChange) {
      onScoreChange(state.score);
    }
  }
}
