import { useRef } from 'react';
import { useGameEngine } from '../../../hooks/useGameEngine.js';
import { game } from '../../../styles/tokens/game.js';
import styles from './GameCanvas.module.css';

export function GameCanvas({ onScoreChange }) {
  const canvasRef = useRef(null);

  useGameEngine(canvasRef, { onScoreChange });

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
