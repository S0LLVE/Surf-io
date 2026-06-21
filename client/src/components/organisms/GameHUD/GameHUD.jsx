import { useEffect } from 'react';
import { Text } from '../../atoms/Text';
import { HudStat } from '../../molecules/HudStat';
import styles from './GameHUD.module.css';

function getPlayerDisplayName(player) {
  return player.pseudo?.trim() || 'Joueur';
}

export function GameHUD({
  score = 0,
  bestScore = 0,
  elapsedTime = '00:00',
  waveCounts = { blue: 0, gold: 0, red: 0 },
  players = [],
}) {
  useEffect(() => {
    console.log('[PLAYERS_LIST_RENDER]', {
      count: players.length,
      players,
    });
  }, [players]);

  return (
    <aside className={styles.hud} aria-label="Statistiques de la partie">
      <div className={styles.headerRow}>
        <div className={styles.scoreBlock}>
          <Text as="p" variant="label">
            Score
          </Text>
          <Text as="p" variant="title">
            {score}
          </Text>
        </div>

        <div className={styles.timerBlock}>
          <Text as="p" variant="value">
            Temps : {elapsedTime}
          </Text>
        </div>
      </div>

      <Text as="p" variant="value" className={styles.bestScore}>
        Meilleur score : {bestScore}
      </Text>

      <div className={styles.statsRow}>
        <HudStat label="Blue" value={waveCounts.blue} tone="blue" />
        <HudStat label="Gold" value={waveCounts.gold} tone="gold" />
        <HudStat label="Red" value={waveCounts.red} tone="red" />
      </div>

      <section className={styles.playersSection} aria-label="Joueurs connectés">
        <Text as="p" variant="label">
          Joueurs connectés ({players.length})
        </Text>
        <ul className={styles.playersList}>
          {players.map((player) => (
            <li key={player.id}>
              <Text as="span" variant="value">
                {getPlayerDisplayName(player)}
              </Text>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
