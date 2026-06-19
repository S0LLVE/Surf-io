import styles from './GameLayout.module.css';

export function GameLayout({ hud, overlay, children }) {
  return (
    <div className={styles.layout}>
      {children}
      {hud}
      {overlay}
    </div>
  );
}
