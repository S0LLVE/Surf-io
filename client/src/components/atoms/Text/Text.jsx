import styles from './Text.module.css';

const variantClass = {
  label: styles.label,
  value: styles.value,
  title: styles.title,
};

export function Text({ as: Component = 'span', variant = 'value', className = '', children }) {
  const classes = [variantClass[variant], className].filter(Boolean).join(' ');

  return <Component className={classes}>{children}</Component>;
}
