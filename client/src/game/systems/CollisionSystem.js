import { circleRectCollision } from '../utils/collision.js';

export class CollisionSystem {
  update(state) {
    const { surfer, waves } = state;

    for (const wave of waves) {
      if (wave.collected) continue;

      const circle = {
        x: wave.x,
        y: wave.y,
        radius: wave.radius,
      };

      if (circleRectCollision(circle, surfer)) {
        wave.collected = true;
      }
    }
  }
}
