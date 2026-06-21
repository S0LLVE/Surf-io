const gameConfig = require('../config/game');

class PlayerManager {
  constructor() {
    this.players = new Map();
  }

  addPlayer(id) {
    const { x, y } = gameConfig.getInitialPosition();

    const player = {
      id,
      x,
      y,
      pseudo: null,
      ready: false,
    };

    this.players.set(id, player);
    return player;
  }

  removePlayer(id) {
    return this.players.delete(id);
  }

  updatePosition(id, x, y) {
    const player = this.players.get(id);

    if (!player) {
      return false;
    }

    player.x = x;
    player.y = y;
    return true;
  }

  updatePseudo(id, pseudo) {
    const player = this.players.get(id);

    if (!player) {
      return false;
    }

    player.pseudo = pseudo;
    return true;
  }

  updateReady(id, ready) {
    const player = this.players.get(id);

    if (!player) {
      return false;
    }

    player.ready = ready;
    return true;
  }

  getAll() {
    return Array.from(this.players.values());
  }

  getCount() {
    return this.players.size;
  }
}

module.exports = PlayerManager;
