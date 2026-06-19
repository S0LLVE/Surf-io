const FADE_START_RATIO = 0.7;

function getFloatingTextAlpha(item) {
  const fadeStart = item.duration * FADE_START_RATIO;

  if (item.elapsed <= fadeStart) {
    return 1;
  }

  const fadeProgress = (item.elapsed - fadeStart) / (item.duration - fadeStart);
  return Math.max(0, 1 - fadeProgress);
}

export function drawFloatingTexts(ctx, floatingTexts) {
  for (const item of floatingTexts) {
    const alpha = getFloatingTextAlpha(item);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = '700 18px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(3, 4, 94, 0.75)';
    ctx.fillStyle = item.color;
    ctx.strokeText(item.text, item.x, item.y);
    ctx.fillText(item.text, item.x, item.y);
    ctx.restore();
  }
}
