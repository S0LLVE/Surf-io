import { useCallback, useState } from 'react';
import { getBestScore, saveBestScore } from '../services/highScoreService.js';

export function useHighScore() {
  const [bestScore, setBestScore] = useState(() => getBestScore());

  const updateBestScore = useCallback((score) => {
    saveBestScore(score);
    setBestScore(getBestScore());
  }, []);

  return { bestScore, updateBestScore };
}
