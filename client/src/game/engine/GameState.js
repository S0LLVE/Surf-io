import { game } from '../../styles/tokens/game.js';
import { Surfer } from '../entities/Surfer.js';

export function createInitialState() {
  const { width, height } = game.canvas;

  return {
    width,
    height,
    score: 0,
    surfer: new Surfer(width / 2 - game.surfer.width / 2, height / 2 - game.surfer.height / 2),
    waves: [],
  };
}

export class GameState {
  constructor() {
    Object.assign(this, createInitialState());
  }

  reset() {
    Object.assign(this, createInitialState());
  }
}
