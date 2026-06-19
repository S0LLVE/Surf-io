function getParticleAlpha(particle) {
  const progress = particle.elapsed / particle.duration;
  return Math.max(0, 1 - progress);
}

function drawBubble(ctx, particle, alpha) {
  ctx.globalAlpha = alpha * 0.85;
  ctx.fillStyle = particle.color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = alpha * 0.5;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(
    particle.x - particle.radius * 0.25,
    particle.y - particle.radius * 0.25,
    particle.radius * 0.25,
    0,
    Math.PI * 2,
  );
  ctx.fill();
}

function drawSpark(ctx, particle, alpha) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = particle.color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = alpha * 0.6;
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(particle.x - particle.radius * 1.4, particle.y);
  ctx.lineTo(particle.x + particle.radius * 1.4, particle.y);
  ctx.moveTo(particle.x, particle.y - particle.radius * 1.4);
  ctx.lineTo(particle.x, particle.y + particle.radius * 1.4);
  ctx.stroke();
}

function drawImpact(ctx, particle, alpha) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = particle.color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = alpha * 0.45;
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.radius + 1.5, 0, Math.PI * 2);
  ctx.stroke();
}

export function drawParticles(ctx, particles) {
  for (const particle of particles) {
    const alpha = getParticleAlpha(particle);

    if (alpha <= 0) {
      continue;
    }

    ctx.save();

    switch (particle.kind) {
      case 'spark':
        drawSpark(ctx, particle, alpha);
        break;
      case 'impact':
        drawImpact(ctx, particle, alpha);
        break;
      case 'bubble':
      default:
        drawBubble(ctx, particle, alpha);
        break;
    }

    ctx.restore();
  }
}
