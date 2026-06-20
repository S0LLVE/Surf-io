import { io } from 'socket.io-client';

export const SOCKET_EVENTS = {
  PLAYERS_SYNC: 'players:sync',
  PLAYER_MOVE: 'player:move',
  PLAYER_JOIN: 'player:join',
};

const SOCKET_URL = 'http://localhost:3001';

let socket = null;

export function connectSocket() {
  if (socket?.connected) {
    return socket;
  }

  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Socket connecté');
    });

    socket.on('disconnect', () => {
      console.log('Socket déconnecté');
    });
  }

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (!socket) {
    return;
  }

  socket.disconnect();
  socket = null;
}
