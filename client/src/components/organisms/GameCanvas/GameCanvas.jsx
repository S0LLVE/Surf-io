import { useRef } from 'react';
import { useGameEngine } from '../../../hooks/useGameEngine.js';
import { game } from '../../../styles/tokens/game.js';
import styles from './GameCanvas.module.css';

export function GameCanvas({ onGameStatsChange, onGameEnd, sessionKey = 0 }) {
  const canvasRef = useRef(null);

  useGameEngine(canvasRef, { onGameStatsChange, onGameEnd, sessionKey });

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width={game.canvas.width}
      height={game.canvas.height}
      aria-label="Zone de jeu Surf.io"
    />
  );
}
