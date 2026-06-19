import { useCallback, useState } from 'react';
import { GameCanvas } from '../components/organisms/GameCanvas';
import styles from './GamePage.module.css';

export function GamePage() {
  const [score, setScore] = useState(0);

  const handleScoreChange = useCallback((newScore) => {
    setScore(newScore);
  }, []);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Surf.io</h1>
      <p className={styles.score}>Score : {score}</p>
      <GameCanvas onScoreChange={handleScoreChange} />
      <p className={styles.hint}>Utilise les flèches du clavier pour te déplacer.</p>
    </main>
  );
}
