import { useEffect, useState } from 'react';
import { formatElapsedTime } from '../utils/formatTime.js';
import { game } from '../styles/tokens/game.js';

export function useGameTimer({ isRunning = true, sessionKey = 0 } = {}) {
  const [elapsedTime, setElapsedTime] = useState('00:00');

  useEffect(() => {
    const startTime = performance.now();

    const intervalId = window.setInterval(() => {
      if (!isRunning) {
        return;
      }

      const elapsedMs = Math.min(performance.now() - startTime, game.session.durationMs);
      setElapsedTime(formatElapsedTime(elapsedMs));
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [isRunning, sessionKey]);

  return elapsedTime;
}
