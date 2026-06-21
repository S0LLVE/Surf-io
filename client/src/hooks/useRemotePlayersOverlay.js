import { useEffect, useRef } from 'react';
import { drawPlayerPseudo } from '../game/renderer/drawPlayerPseudo.js';
import { drawRemotePlayer } from '../game/renderer/drawRemotePlayer.js';

export function useRemotePlayersOverlay(canvasRef, players, localPlayerId) {
  const playersRef = useRef(players);
  const lastLoggedRef = useRef(new Map());

  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const lastLogged = lastLoggedRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const player of playersRef.current) {
        if (localPlayerId && player.id === localPlayerId) {
          const renderInfo = drawPlayerPseudo(ctx, player);
          const logKey = `${renderInfo.pseudo}:${renderInfo.x}:${renderInfo.y}`;

          if (lastLogged.get(player.id) !== logKey) {
            lastLogged.set(player.id, logKey);
            console.log('[PSEUDO_RENDER]', renderInfo);
          }

          continue;
        }

        drawRemotePlayer(ctx, player);

        const renderInfo = drawPlayerPseudo(ctx, player);
        const logKey = `${renderInfo.pseudo}:${renderInfo.x}:${renderInfo.y}`;

        if (lastLogged.get(player.id) !== logKey) {
          lastLogged.set(player.id, logKey);
          console.log('[PSEUDO_RENDER]', renderInfo);
        }
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      lastLogged.clear();
    };
  }, [canvasRef, localPlayerId]);
}
