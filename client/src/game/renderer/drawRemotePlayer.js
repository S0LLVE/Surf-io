import { game } from '../../styles/tokens/game.js';

const REMOTE_PLAYER_COLOR = '#22c55e';

export function drawRemotePlayer(ctx, player) {
  ctx.fillStyle = REMOTE_PLAYER_COLOR;
  ctx.fillRect(
    player.x,
    player.y,
    game.surfer.width,
    game.surfer.height,
  );
}
