import { LobbyForm } from '../../components/molecules/LobbyForm';
import { Text } from '../../components/atoms/Text';
import styles from './LobbyPage.module.css';

export function LobbyPage({ onStart }) {
  return (
    <main className={styles.page}>
      <div className={styles.panel}>
        <Text as="h1" variant="title" className={styles.title}>
          Surf.io
        </Text>
        <Text as="p" variant="label" className={styles.subtitle}>
          Choisis un pseudo pour rejoindre la partie
        </Text>
        <LobbyForm onStart={onStart} />
      </div>
    </main>
  );
}
