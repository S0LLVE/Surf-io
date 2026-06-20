import { game } from '../../styles/tokens/game.js';

const DEFAULT_PSEUDO_LABEL = 'Joueur';
const PSEUDO_OFFSET_Y = 8;

export function getPlayerPseudoLabel(player) {
  const pseudo = player.pseudo?.trim();
  return pseudo || DEFAULT_PSEUDO_LABEL;
}

export function drawPlayerPseudo(ctx, player) {
  const pseudo = getPlayerPseudoLabel(player);
  const centerX = player.x + game.surfer.width / 2;
  const labelY = player.y - PSEUDO_OFFSET_Y;

  ctx.save();
  ctx.font = '600 12px var(--font-body, Inter, system-ui, sans-serif)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.strokeStyle = 'rgba(2, 62, 138, 0.9)';
  ctx.lineWidth = 3;
  ctx.fillStyle = '#CAF0F8';
  ctx.strokeText(pseudo, centerX, labelY);
  ctx.fillText(pseudo, centerX, labelY);
  ctx.restore();

  return {
    id: player.id,
    pseudo,
    x: player.x,
    y: player.y,
  };
}
