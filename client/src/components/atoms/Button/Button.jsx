import styles from './Button.module.css';

export function Button({ children, onClick, type = 'button', disabled = false }) {
  return (
    <button type={type} className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
