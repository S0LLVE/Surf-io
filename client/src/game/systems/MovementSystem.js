import { clamp } from '../utils/math.js';

export class MovementSystem {
  update(state) {
    const { surfer, width, height } = state;

    surfer.x = clamp(surfer.x + surfer.velocityX, 0, width - surfer.width);
    surfer.y = clamp(surfer.y + surfer.velocityY, 0, height - surfer.height);
  }
}
