import { colors } from '../../styles/tokens/colors.js';
import { WAVE_TYPES } from '../entities/Wave.js';
import { randomBetween } from '../utils/math.js';

function getWaveCenter(wave) {
  return {
    x: wave.x + wave.width / 2,
    y: wave.y + wave.height / 2,
  };
}

function createBubbleParticle(x, y) {
  return {
    kind: 'bubble',
    x: x + randomBetween(-10, 10),
    y: y + randomBetween(-6, 6),
    vx: randomBetween(-0.018, 0.018),
    vy: randomBetween(-0.055, -0.028),
    radius: randomBetween(2, 5),
    color: Math.random() > 0.5 ? colors.wave : colors.foam,
    elapsed: 0,
    duration: randomBetween(650, 900),
  };
}

function createSparkParticle(x, y, angle) {
  const speed = randomBetween(0.035, 0.075);

  return {
    kind: 'spark',
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(2, 4),
    color: Math.random() > 0.35 ? colors.waveGold : colors.foam,
    elapsed: 0,
    duration: randomBetween(480, 720),
  };
}

function createImpactParticle(x, y, angle) {
  const speed = randomBetween(0.045, 0.11);

  return {
    kind: 'impact',
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(3, 6),
    color: Math.random() > 0.5 ? colors.waveDanger : '#FF8FA3',
    elapsed: 0,
    duration: randomBetween(380, 620),
  };
}

function createBlueBubbles(wave) {
  const { x, y } = getWaveCenter(wave);

  return Array.from({ length: 9 }, () => createBubbleParticle(x, y));
}

function createGoldSparkles(wave) {
  const { x, y } = getWaveCenter(wave);
  const sparkCount = 10;

  return Array.from({ length: sparkCount }, (_, index) => {
    const angle = (Math.PI * 2 * index) / sparkCount + randomBetween(-0.25, 0.25);
    return createSparkParticle(x, y, angle);
  });
}

function createRedImpact(wave) {
  const { x, y } = getWaveCenter(wave);
  const impactCount = 12;

  return Array.from({ length: impactCount }, () => {
    const angle = randomBetween(0, Math.PI * 2);
    return createImpactParticle(x, y, angle);
  });
}

export function createParticlesForWave(wave) {
  switch (wave.type) {
    case WAVE_TYPES.GOLD:
      return createGoldSparkles(wave);
    case WAVE_TYPES.RED:
      return createRedImpact(wave);
    case WAVE_TYPES.BLUE:
    default:
      return createBlueBubbles(wave);
  }
}
