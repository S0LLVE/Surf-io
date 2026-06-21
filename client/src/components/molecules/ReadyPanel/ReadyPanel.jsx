import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import styles from './ReadyPanel.module.css';

function getPlayerDisplayName(player) {
  return player.pseudo?.trim() || 'Joueur';
}

export function ReadyPanel({
  players = [],
  readyCount = 0,
  isReady = false,
  onReadyClick,
}) {
  return (
    <section className={styles.panel} aria-label="Salle d'attente">
      <Text as="p" variant="value">
        Joueurs connectés : {players.length}
      </Text>
      <Text as="p" variant="value">
        Joueurs prêts : {readyCount} / {players.length}
      </Text>

      <ul className={styles.playersList}>
        {players.map((player) => (
          <li key={player.id} className={styles.playerItem}>
            <Text as="span" variant="value">
              {getPlayerDisplayName(player)}
            </Text>
            <Text as="span" variant="label" className={styles.readyStatus}>
              {player.ready ? 'Prêt' : 'En attente'}
            </Text>
          </li>
        ))}
      </ul>

      <Button type="button" onClick={onReadyClick} disabled={isReady}>
        Je suis prêt
      </Button>
    </section>
  );
}
