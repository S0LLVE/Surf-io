import { useCallback, useEffect, useState } from 'react';
import { connectSocket, getSocket, SOCKET_EVENTS } from '../services/socketService.js';

export function useSocket(pseudo) {
  const [players, setPlayers] = useState([]);
  const [socketId, setSocketId] = useState(() => getSocket()?.id ?? null);
  const [syncedPseudo, setSyncedPseudo] = useState(pseudo ?? null);

  const emitPlayerJoin = useCallback(
    (socket) => {
      if (!pseudo?.trim()) {
        return;
      }

      console.log('[PLAYER_JOIN]', { pseudo: pseudo.trim() });
      socket.emit(SOCKET_EVENTS.PLAYER_JOIN, { pseudo: pseudo.trim() });
    },
    [pseudo],
  );

  useEffect(() => {
    const socket = connectSocket();

    const handleConnect = () => {
      setSocketId(socket.id);
      emitPlayerJoin(socket);
    };

    const handlePlayersSync = ({ players: syncedPlayers }) => {
      console.log('PLAYERS_SYNC reçu');
      console.log('[PSEUDO_SYNC]', syncedPlayers);
      setPlayers(syncedPlayers ?? []);

      const localPlayer = syncedPlayers?.find((player) => player.id === socket.id);
      if (localPlayer?.pseudo) {
        setSyncedPseudo(localPlayer.pseudo);
      }
    };

    if (socket.connected) {
      setSocketId(socket.id);
      emitPlayerJoin(socket);
    }

    socket.on('connect', handleConnect);
    socket.on(SOCKET_EVENTS.PLAYERS_SYNC, handlePlayersSync);

    return () => {
      socket.off('connect', handleConnect);
      socket.off(SOCKET_EVENTS.PLAYERS_SYNC, handlePlayersSync);
    };
  }, [emitPlayerJoin]);

  return { players, socketId, pseudo: syncedPseudo };
}
