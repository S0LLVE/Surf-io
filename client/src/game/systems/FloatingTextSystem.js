import { colors } from '../../styles/tokens/colors.js';
import { WAVE_TYPES } from '../entities/Wave.js';

const DURATION_MS = 1000;
const RISE_SPEED = 0.04;

const TYPE_COLOR = {
  [WAVE_TYPES.BLUE]: colors.wave,
  [WAVE_TYPES.GOLD]: colors.waveGold,
  [WAVE_TYPES.RED]: colors.waveDanger,
};

function formatPoints(points) {
  return points >= 0 ? `+${points}` : `${points}`;
}

function createFloatingText(wave) {
  return {
    x: wave.x + wave.width / 2,
    y: wave.y,
    text: formatPoints(wave.points),
    color: TYPE_COLOR[wave.type] ?? colors.wave,
    elapsed: 0,
    duration: DURATION_MS,
    riseSpeed: RISE_SPEED,
  };
}

export class FloatingTextSystem {
  constructor() {
    this.processedWaveIds = new Set();
  }

  update(state, deltaTime) {
    this.spawnFromCollectedWaves(state);
    this.cleanupProcessedIds(state);
    this.updateFloatingTexts(state, deltaTime);
  }

  spawnFromCollectedWaves(state) {
    for (const wave of state.waves) {
      if (!wave.collected || this.processedWaveIds.has(wave.id)) {
        continue;
      }

      this.processedWaveIds.add(wave.id);
      state.floatingTexts.push(createFloatingText(wave));
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

  updateFloatingTexts(state, deltaTime) {
    state.floatingTexts = state.floatingTexts.filter((item) => {
      item.elapsed += deltaTime;
      item.y -= item.riseSpeed * deltaTime;

      if (item.elapsed >= item.duration) {
        return false;
      }

      return true;
    });
  }
}
