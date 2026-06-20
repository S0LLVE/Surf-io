import { useState } from 'react';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Text } from '../../atoms/Text';
import styles from './LobbyForm.module.css';

const MAX_PSEUDO_LENGTH = 20;

export function LobbyForm({ onStart }) {
  const [draftPseudo, setDraftPseudo] = useState('');
  const trimmedPseudo = draftPseudo.trim();
  const isValid = trimmedPseudo.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onStart(trimmedPseudo);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field} htmlFor="pseudo">
        <Text as="span" variant="label" className={styles.label}>
          Pseudo
        </Text>
        <Input
          id="pseudo"
          name="pseudo"
          value={draftPseudo}
          onChange={(event) => setDraftPseudo(event.target.value)}
          placeholder="Entre ton pseudo"
          maxLength={MAX_PSEUDO_LENGTH}
          aria-label="Pseudo"
        />
      </label>

      <Button type="submit" disabled={!isValid}>
        Jouer
      </Button>
    </form>
  );
}
