const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const SURFER_WIDTH = 40;
const SURFER_HEIGHT = 60;

module.exports = {
  canvas: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  surfer: {
    width: SURFER_WIDTH,
    height: SURFER_HEIGHT,
  },
  syncIntervalMs: 100,
  getInitialPosition() {
    return {
      x: CANVAS_WIDTH / 2 - SURFER_WIDTH / 2,
      y: CANVAS_HEIGHT / 2 - SURFER_HEIGHT / 2,
    };
  },
};
