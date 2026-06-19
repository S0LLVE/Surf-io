import { useEffect, useRef } from 'react';
import { GameEngine } from '../game/engine/GameEngine.js';

export function useGameEngine(canvasRef, { onScoreChange } = {}) {
  const engineRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new GameEngine(canvas, { onScoreChange });
    engineRef.current = engine;
    engine.start();

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [canvasRef, onScoreChange]);
}
