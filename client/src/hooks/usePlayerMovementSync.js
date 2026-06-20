import { useCallback, useRef } from 'react';
import { connectSocket, SOCKET_EVENTS } from '../services/socketService.js';

export function usePlayerMovementSync() {
  const lastPositionRef = useRef(null);

  return useCallback(({ x, y }) => {
    const lastPosition = lastPositionRef.current;

    console.log('[MOVE CHECK]', {
      x,
      y,
      lastPosition,
    });

    if (lastPosition?.x === x && lastPosition?.y === y) {
      return;
    }

    lastPositionRef.current = { x, y };

    const socket = connectSocket();
    console.log('[SOCKET STATUS]', {
      connected: socket.connected,
      id: socket.id,
    });
    if (!socket.connected) {
      return;
    }

    console.log('[MOVE EMIT]', { x, y });
    socket.emit(SOCKET_EVENTS.PLAYER_MOVE, { x, y });
  }, []);
}
