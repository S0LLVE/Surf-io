export const FLOAT_CONFIG = {
  amplitude: 2.5,
  speed: 0.0025,
};

export function getFloatOffset(
  timeMs,
  seed,
  amplitude = FLOAT_CONFIG.amplitude,
  speed = FLOAT_CONFIG.speed,
) {
  return Math.sin(timeMs * speed + seed) * amplitude;
}

export function drawEllipseShadow(ctx, centerX, baseY, radiusX, radiusY, opacity = 0.22) {
  ctx.save();
  ctx.fillStyle = `rgba(0, 24, 48, ${opacity})`;
  ctx.beginPath();
  ctx.ellipse(centerX, baseY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
