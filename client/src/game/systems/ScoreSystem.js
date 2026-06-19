export class ScoreSystem {
  update(state, onGameStatsChange) {
    const collectedWaves = state.waves.filter((wave) => wave.collected);

    if (collectedWaves.length === 0) return;

    const pointsEarned = collectedWaves.reduce((total, wave) => total + wave.points, 0);

    for (const wave of collectedWaves) {
      if (Object.hasOwn(state.waveCounts, wave.type)) {
        state.waveCounts[wave.type] += 1;
      }
    }

    state.score += pointsEarned;
    state.waves = state.waves.filter((wave) => !wave.collected);

    if (onGameStatsChange) {
      onGameStatsChange({
        score: state.score,
        waveCounts: { ...state.waveCounts },
      });
    }
  }
}
