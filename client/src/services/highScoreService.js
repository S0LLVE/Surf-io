const STORAGE_KEY = 'surf-io:best-score';

export function getBestScore() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : 0;
  } catch {
    return 0;
  }
}

export function saveBestScore(score) {
  const currentBest = getBestScore();

  if (score <= currentBest) {
    return currentBest;
  }

  localStorage.setItem(STORAGE_KEY, String(score));
  return score;
}
