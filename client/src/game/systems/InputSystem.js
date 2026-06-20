import { KEYS } from '../engine/constants.js';
import { game } from '../../styles/tokens/game.js';

export class InputSystem {
  constructor() {
    this.keys = new Set();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  start() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  stop() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.keys.clear();
  }

  handleKeyDown(event) {
    if (Object.values(KEYS).includes(event.key)) {
      event.preventDefault();
      this.keys.add(event.key);
    }
  }

  handleKeyUp(event) {
    this.keys.delete(event.key);
  }

  update(state) {
    const { surfer } = state;
    const speed = game.surfer.speed;

    surfer.velocityX = 0;
    surfer.velocityY = 0;

    if (this.keys.has(KEYS.ArrowLeft)) surfer.velocityX = -speed;
    if (this.keys.has(KEYS.ArrowRight)) surfer.velocityX = speed;
    if (this.keys.has(KEYS.ArrowUp)) surfer.velocityY = -speed;
    if (this.keys.has(KEYS.ArrowDown)) surfer.velocityY = speed;

    console.log('[KEYS]', [...this.keys]);
    console.log('[VELOCITY]', surfer.velocityX, surfer.velocityY);
  }
}
