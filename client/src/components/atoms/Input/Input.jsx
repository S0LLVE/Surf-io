import styles from './Input.module.css';

export function Input({
  id,
  name,
  value,
  onChange,
  placeholder,
  maxLength,
  'aria-label': ariaLabel,
  autoComplete = 'off',
}) {
  return (
    <input
      id={id}
      name={name}
      type="text"
      className={styles.input}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      aria-label={ariaLabel}
      autoComplete={autoComplete}
    />
  );
}
