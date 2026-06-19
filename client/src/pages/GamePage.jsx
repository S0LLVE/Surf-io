import { useCallback, useState } from 'react';
import { GameCanvas } from '../components/organisms/GameCanvas';
import { GameHUD } from '../components/organisms/GameHUD';
import { GameOverModal } from '../components/organisms/GameOverModal';
import { GameLayout } from '../components/templates/GameLayout';
import { useGameTimer } from '../hooks/useGameTimer.js';
import { useHighScore } from '../hooks/useHighScore.js';
import { formatElapsedTime } from '../utils/formatTime.js';
import { game } from '../styles/tokens/game.js';
import styles from './GamePage.module.css';

const INITIAL_STATS = {
  score: 0,
  waveCounts: {
    blue: 0,
    gold: 0,
    red: 0,
  },
};

export function GamePage() {
  const [sessionKey, setSessionKey] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStats, setGameStats] = useState(INITIAL_STATS);
  const { bestScore, updateBestScore } = useHighScore();
  const elapsedTime = useGameTimer({ isRunning: !gameOver, sessionKey });
  const displayTime = gameOver ? formatElapsedTime(game.session.durationMs) : elapsedTime;

  const handleGameStatsChange = useCallback(
    (stats) => {
      setGameStats(stats);
      updateBestScore(stats.score);
    },
    [updateBestScore],
  );

  const handleGameEnd = useCallback(
    (finalStats) => {
      setGameStats(finalStats);
      updateBestScore(finalStats.score);
      setGameOver(true);
    },
    [updateBestScore],
  );

  const handleReplay = useCallback(() => {
    setGameOver(false);
    setGameStats(INITIAL_STATS);
    setSessionKey((current) => current + 1);
  }, []);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Surf.io</h1>

      <GameLayout
        hud={
          <GameHUD
            score={gameStats.score}
            bestScore={bestScore}
            elapsedTime={displayTime}
            waveCounts={gameStats.waveCounts}
          />
        }
        overlay={
          gameOver ? (
            <GameOverModal score={gameStats.score} bestScore={bestScore} onReplay={handleReplay} />
          ) : null
        }
      >
        <GameCanvas
          key={sessionKey}
          sessionKey={sessionKey}
          onGameStatsChange={handleGameStatsChange}
          onGameEnd={handleGameEnd}
        />
      </GameLayout>

      <p className={styles.hint}>Utilise les flèches du clavier pour te déplacer.</p>
    </main>
  );
}
