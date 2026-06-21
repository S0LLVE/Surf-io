import { useCallback, useState } from 'react';
import { LobbyPage } from './pages/LobbyPage';
import { WaitingRoomPage } from './pages/WaitingRoomPage';
import { GamePage } from './pages/GamePage';

function App() {
  const [pseudo, setPseudo] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (nextPseudo) => {
    const trimmedPseudo = nextPseudo.trim();

    if (!trimmedPseudo) {
      return;
    }

    setPseudo(trimmedPseudo);
  };

  const handleAllReady = useCallback(() => {
    console.log('[START_GAME]');
    setGameStarted(true);
  }, []);

  if (pseudo === null) {
    return <LobbyPage onStart={handleStartGame} />;
  }

  if (!gameStarted) {
    return <WaitingRoomPage pseudo={pseudo} onAllReady={handleAllReady} />;
  }

  return <GamePage pseudo={pseudo} />;
}

export default App;
