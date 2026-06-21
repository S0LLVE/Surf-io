const gameConfig = require('../config/game');
const PlayerManager = require('../services/PlayerManager');
const SOCKET_EVENTS = require('./events');

function initSocket(io) {
  console.log('[DIAG] initSocket() — démarrage');
  console.log('[DIAG] Événement PLAYERS_SYNC :', SOCKET_EVENTS.PLAYERS_SYNC);
  console.log('[DIAG] Intervalle sync (ms) :', gameConfig.syncIntervalMs);

  const playerManager = new PlayerManager();

  const broadcastPlayers = () => {
    console.log('[DEBUG_PLAYERS_BEFORE_SYNC]', playerManager.getAll());
    const players = playerManager.getAll();

    console.log('[DIAG] broadcastPlayers() appelé');
    console.log('[DIAG] players actuel :', players);
    console.log('[PSEUDO_SYNC]', players);
    console.log('[READY_SYNC]', playerManager.getAll());
    console.log('[DIAG] Émission PLAYERS_SYNC →', SOCKET_EVENTS.PLAYERS_SYNC, `(${players.length} joueur(s))`);

    io.emit(SOCKET_EVENTS.PLAYERS_SYNC, {
      players,
    });

    console.log('[DIAG] io.emit() exécuté');
  };

  const syncIntervalId = setInterval(broadcastPlayers, gameConfig.syncIntervalMs);
  console.log('[DIAG] setInterval broadcastPlayers actif toutes les', gameConfig.syncIntervalMs, 'ms');

  io.on('connection', (socket) => {
    console.log('[DIAG] io.on("connection") déclenché — socket.id :', socket.id);

    const player = playerManager.addPlayer(socket.id);
    const players = playerManager.getAll();

    console.log('[DIAG] Joueur ajouté :', player);
    console.log('Client connecté :', socket.id);
    console.log('Joueurs :', players);
    console.log('[DIAG] PlayerManager count :', playerManager.getCount());

    broadcastPlayers();

    socket.on(SOCKET_EVENTS.PLAYER_JOIN, (data) => {
      console.log('[DEBUG_PLAYER_JOIN]', data);
      console.log('[PSEUDO_RECEIVED]', socket.id, data);

      const { pseudo } = data;
      if (typeof pseudo !== 'string' || !pseudo.trim()) {
        return;
      }

      playerManager.updatePseudo(socket.id, pseudo.trim());
      console.log('[DEBUG_GETALL_RESULT]', playerManager.getAll());
    });

    socket.on(SOCKET_EVENTS.PLAYER_READY, (data) => {
      console.log('[PLAYER_READY]', socket.id, data);

      const { ready } = data;
      if (typeof ready !== 'boolean') {
        return;
      }

      playerManager.updateReady(socket.id, ready);
      console.log('[READY_SYNC]', playerManager.getAll());
    });

    socket.on(SOCKET_EVENTS.PLAYER_MOVE, (data) => {
      console.log('[MOVE RECEIVED]', socket.id, data);

      const { x, y } = data;
      if (typeof x !== 'number' || typeof y !== 'number') {
        return;
      }

      playerManager.updatePosition(socket.id, x, y);
    });

    socket.on('disconnect', (_reason) => {
      playerManager.removePlayer(socket.id);

      console.log('[DIAG] Déconnexion — socket.id :', socket.id);
      console.log('Client déconnecté :', socket.id);
      console.log('Joueurs :', playerManager.getAll());

      broadcastPlayers();
    });
  });

  console.log('[DIAG] io.on("connection") enregistré');

  return {
    playerManager,
    stop() {
      clearInterval(syncIntervalId);
    },
  };
}

module.exports = initSocket;
