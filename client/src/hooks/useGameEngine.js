import { useEffect, useRef } from 'react';
import { GameEngine } from '../game/engine/GameEngine.js';

export function useGameEngine(canvasRef, { onGameStatsChange, onGameEnd, sessionKey = 0 } = {}) {
  const engineRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    GameEngine.create(canvas, { onGameStatsChange, onGameEnd }).then((engine) => {
      if (cancelled) {
        engine.destroy();
        return;
      }

      engineRef.current = engine;
      engine.start();
    });

    return () => {
      cancelled = true;
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, [canvasRef, onGameStatsChange, onGameEnd, sessionKey]);
}
