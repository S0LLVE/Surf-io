import { useState } from 'react';
import { GamePage } from './pages/GamePage.jsx';
import { LobbyPage } from './pages/LobbyPage';

function App() {
  const [pseudo, setPseudo] = useState(null);

  const handleStartGame = (nextPseudo) => {
    const trimmedPseudo = nextPseudo.trim();

    if (!trimmedPseudo) {
      return;
    }

    setPseudo(trimmedPseudo);
  };

  if (pseudo === null) {
    return <LobbyPage onStart={handleStartGame} />;
  }

  return <GamePage pseudo={pseudo} />;
}

export default App;
