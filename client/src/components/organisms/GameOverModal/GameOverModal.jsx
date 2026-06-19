import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import styles from './GameOverModal.module.css';

export function GameOverModal({ score = 0, bestScore = 0, onReplay }) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="game-over-title">
      <div className={styles.panel}>
        <Text as="h2" id="game-over-title" variant="title" className={styles.title}>
          Partie terminée
        </Text>

        <div className={styles.stats}>
          <Text as="p" variant="value">
            Score final : {score}
          </Text>
          <Text as="p" variant="value">
            Meilleur score : {bestScore}
          </Text>
        </div>

        <Button onClick={onReplay}>Rejouer</Button>
      </div>
    </div>
  );
}
