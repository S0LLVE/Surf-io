import { Text } from '../../atoms/Text';
import styles from './HudStat.module.css';

const toneClass = {
  blue: styles.blue,
  gold: styles.gold,
  red: styles.red,
  neutral: styles.neutral,
};

export function HudStat({ label, value, tone = 'neutral' }) {
  return (
    <div className={`${styles.stat} ${toneClass[tone] ?? toneClass.neutral}`}>
      <Text as="span" variant="label">
        {label}
      </Text>
      <Text as="span" variant="value">
        {value}
      </Text>
    </div>
  );
}
