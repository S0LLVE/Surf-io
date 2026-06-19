import { game } from '../../styles/tokens/game.js';
import { Entity } from './Entity.js';

export class Wave extends Entity {
  constructor(x, y) {
    const diameter = game.wave.radius * 2;
    super(x, y, diameter, diameter);
    this.radius = game.wave.radius;
    this.points = game.wave.points;
    this.collected = false;
  }
}
