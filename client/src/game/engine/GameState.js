import { game } from '../../styles/tokens/game.js';
import { Surfer } from '../entities/Surfer.js';
import { GAME_STATUS } from './constants.js';

export function createInitialWaveCounts() {
  return {
    blue: 0,
    gold: 0,
    red: 0,
  };
}

export function createInitialState() {
  const { width, height } = game.canvas;

  return {
    width,
    height,
    score: 0,
    elapsedTime: 0,
    status: GAME_STATUS.RUNNING,
    waveCounts: createInitialWaveCounts(),
    floatingTexts: [],
    particles: [],
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
