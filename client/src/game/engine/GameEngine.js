import { GameLoop } from './GameLoop.js';
import { GameState } from './GameState.js';
import { GAME_STATUS } from './constants.js';
import { game } from '../../styles/tokens/game.js';
import { InputSystem } from '../systems/InputSystem.js';
import { MovementSystem } from '../systems/MovementSystem.js';
import { SpawnSystem } from '../systems/SpawnSystem.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { ScoreSystem } from '../systems/ScoreSystem.js';
import { FloatingTextSystem } from '../systems/FloatingTextSystem.js';
import { EffectsSystem } from '../systems/EffectsSystem.js';
import { RenderSystem } from '../systems/RenderSystem.js';
import { SpriteLoader } from '../sprites/SpriteLoader.js';

export class GameEngine {
  constructor(canvas, { onGameStatsChange, onGameEnd, onSurferPositionChange, sprites } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onGameStatsChange = onGameStatsChange;
    this.onGameEnd = onGameEnd;
    this.onSurferPositionChange = onSurferPositionChange;
    this.sprites = sprites;

    this.state = new GameState();
    this.inputSystem = new InputSystem();
    this.movementSystem = new MovementSystem();
    this.spawnSystem = new SpawnSystem();
    this.collisionSystem = new CollisionSystem();
    this.scoreSystem = new ScoreSystem();
    this.floatingTextSystem = new FloatingTextSystem();
    this.effectsSystem = new EffectsSystem();
    this.renderSystem = new RenderSystem(this.ctx, this.state.width, this.state.height, sprites);

    this.loop = new GameLoop(this.update, this.render);
  }

  static async create(canvas, options = {}) {
    const sprites = await SpriteLoader.loadAll();
    return new GameEngine(canvas, { ...options, sprites });
  }

  update = (deltaTime) => {
    if (this.state.status !== GAME_STATUS.RUNNING) {
      return;
    }

    this.state.elapsedTime += deltaTime;

    if (this.state.elapsedTime >= game.session.durationMs) {
      this.endGame();
      return;
    }

    this.inputSystem.update(this.state);
    this.movementSystem.update(this.state);

    if (this.onSurferPositionChange) {
      const { x, y } = this.state.surfer;
      this.onSurferPositionChange({ x, y });
    }

    this.spawnSystem.update(this.state, deltaTime);
    this.collisionSystem.update(this.state);
    this.floatingTextSystem.update(this.state, deltaTime);
    this.effectsSystem.update(this.state, deltaTime);
    this.scoreSystem.update(this.state, this.onGameStatsChange);
  };

  render = () => {
    this.renderSystem.update(this.state);
  };

  endGame() {
    if (this.state.status === GAME_STATUS.GAME_OVER) {
      return;
    }

    this.state.status = GAME_STATUS.GAME_OVER;
    this.state.elapsedTime = game.session.durationMs;
    this.stop();

    if (this.onGameEnd) {
      this.onGameEnd({
        score: this.state.score,
        waveCounts: { ...this.state.waveCounts },
      });
    }
  }

  start() {
    this.inputSystem.start();
    this.loop.start();
  }

  stop() {
    this.loop.stop();
    this.inputSystem.stop();
  }

  destroy() {
    this.stop();
  }
}
