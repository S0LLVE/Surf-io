import { useEffect } from 'react';
import { ReadyPanel } from '../../components/molecules/ReadyPanel';
import { Text } from '../../components/atoms/Text';
import { useSocket } from '../../hooks/useSocket.js';
import styles from './WaitingRoomPage.module.css';

export function WaitingRoomPage({ pseudo, onAllReady }) {
  const { activePlayers, isReady, readyCount, allReady, emitPlayerReady } = useSocket(pseudo);

  useEffect(() => {
    console.log('[READY_STATE]', {
      isReady,
      readyCount,
      allReady,
      players: activePlayers,
    });
  }, [isReady, readyCount, allReady, activePlayers]);

  useEffect(() => {
    if (!allReady) {
      return;
    }

    console.log('[ALL_READY]', { players: activePlayers, readyCount, allReady });
    onAllReady();
  }, [allReady, onAllReady, activePlayers, readyCount]);

  const handleReadyClick = () => {
    console.log('[PLAYER_READY_CLICK]', { ready: true });
    emitPlayerReady();
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Text as="h1" variant="title" className={styles.title}>
          Surf.io
        </Text>
        <Text as="p" variant="label" className={styles.subtitle}>
          Salle d&apos;attente
        </Text>
        <ReadyPanel
          players={activePlayers}
          readyCount={readyCount}
          isReady={isReady}
          onReadyClick={handleReadyClick}
        />
      </div>
    </main>
  );
}
