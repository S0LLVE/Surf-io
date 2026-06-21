import { useCallback, useEffect, useMemo, useState } from 'react';
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

  const emitPlayerReady = useCallback(() => {
    const socket = connectSocket();
    if (!socket.connected) {
      return;
    }

    socket.emit(SOCKET_EVENTS.PLAYER_READY, { ready: true });
  }, []);

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
      queueMicrotask(handleConnect);
    }

    socket.on('connect', handleConnect);
    socket.on(SOCKET_EVENTS.PLAYERS_SYNC, handlePlayersSync);

    return () => {
      socket.off('connect', handleConnect);
      socket.off(SOCKET_EVENTS.PLAYERS_SYNC, handlePlayersSync);
    };
  }, [emitPlayerJoin]);

  const activePlayers = useMemo(
    () => players.filter((player) => player.pseudo?.trim()),
    [players],
  );

  const isReady = useMemo(() => {
    if (!socketId) {
      return false;
    }

    const localPlayer = players.find((player) => player.id === socketId);
    return localPlayer?.ready === true;
  }, [players, socketId]);

  const readyCount = useMemo(
    () => activePlayers.filter((player) => player.ready === true).length,
    [activePlayers],
  );

  const allReady = useMemo(
    () => activePlayers.length > 0 && activePlayers.every((player) => player.ready === true),
    [activePlayers],
  );

  useEffect(() => {
    console.log('[ACTIVE_PLAYERS]', {
      playersLength: players.length,
      activePlayersLength: activePlayers.length,
      activePlayers,
    });
    console.log('[ALL_READY_CHECK]', {
      playersLength: players.length,
      activePlayersLength: activePlayers.length,
      readyCount,
      allReady,
    });
  }, [players, activePlayers, readyCount, allReady]);

  return {
    players,
    activePlayers,
    socketId,
    pseudo: syncedPseudo,
    isReady,
    readyCount,
    allReady,
    emitPlayerReady,
  };
}
