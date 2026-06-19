import { GameLoop } from './GameLoop.js';
import { GameState } from './GameState.js';
import { InputSystem } from '../systems/InputSystem.js';
import { MovementSystem } from '../systems/MovementSystem.js';
import { SpawnSystem } from '../systems/SpawnSystem.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { ScoreSystem } from '../systems/ScoreSystem.js';
import { RenderSystem } from '../systems/RenderSystem.js';

export class GameEngine {
  constructor(canvas, { onScoreChange } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onScoreChange = onScoreChange;

    this.state = new GameState();
    this.inputSystem = new InputSystem();
    this.movementSystem = new MovementSystem();
    this.spawnSystem = new SpawnSystem();
    this.collisionSystem = new CollisionSystem();
    this.scoreSystem = new ScoreSystem();
    this.renderSystem = new RenderSystem(this.ctx, this.state.width, this.state.height);

    this.loop = new GameLoop(this.update, this.render);
  }

  update = (deltaTime) => {
    this.inputSystem.update(this.state);
    this.movementSystem.update(this.state);
    this.spawnSystem.update(this.state, deltaTime);
    this.collisionSystem.update(this.state);
    this.scoreSystem.update(this.state, this.onScoreChange);
  };

  render = () => {
    this.renderSystem.update(this.state);
  };

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
