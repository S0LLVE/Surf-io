const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const initSocket = require('./socket');

const PORT = 3001;
const app = express();

app.use(cors());

app.get('/', (_request, response) => {
  response.json({ status: 'ok', service: 'surf-io-server' });
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

console.log('[DIAG] Serveur HTTP + Socket.io initialisé');
console.log('[DIAG] Namespace par défaut :', io._opts?.path ?? '/socket.io');

const socketContext = initSocket(io);

console.log('[DIAG] initSocket(io) exécuté');

httpServer.listen(PORT, () => {
  console.log(`Surf.io server running on http://localhost:${PORT}`);
  console.log('[DIAG] Serveur démarré sur le port', PORT);
  console.log('[DIAG] PlayerManager prêt :', Boolean(socketContext.playerManager));
});
