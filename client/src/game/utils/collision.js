export function circleRectCollision(circle, rect) {
  const closestX = Math.max(rect.x, Math.min(circle.x + circle.radius, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(circle.y + circle.radius, rect.y + rect.height));

  const distanceX = circle.x + circle.radius - closestX;
  const distanceY = circle.y + circle.radius - closestY;

  return distanceX * distanceX + distanceY * distanceY < circle.radius * circle.radius;
}
