import { useRef } from 'react';
import { useGameEngine } from '../../../hooks/useGameEngine.js';
import { usePlayerMovementSync } from '../../../hooks/usePlayerMovementSync.js';
import { useRemotePlayersOverlay } from '../../../hooks/useRemotePlayersOverlay.js';
import { game } from '../../../styles/tokens/game.js';
import styles from './GameCanvas.module.css';

export function GameCanvas({
  players = [],
  localPlayerId = null,
  onGameStatsChange,
  onGameEnd,
  sessionKey = 0,
}) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const onSurferPositionChange = usePlayerMovementSync();

  useGameEngine(canvasRef, { onGameStatsChange, onGameEnd, onSurferPositionChange, sessionKey });
  useRemotePlayersOverlay(overlayRef, players, localPlayerId);

  return (
    <div className={styles.wrapper}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={game.canvas.width}
        height={game.canvas.height}
        aria-label="Zone de jeu Surf.io"
      />
      <canvas
        ref={overlayRef}
        className={styles.overlay}
        width={game.canvas.width}
        height={game.canvas.height}
        aria-hidden="true"
      />
    </div>
  );
}
