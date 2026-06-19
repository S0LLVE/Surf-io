import { game } from '../../styles/tokens/game.js';
import { Entity } from './Entity.js';

export class Surfer extends Entity {
  constructor(x, y) {
    super(x, y, game.surfer.width, game.surfer.height);
    this.speed = game.surfer.speed;
    this.velocityX = 0;
    this.velocityY = 0;
  }
}
