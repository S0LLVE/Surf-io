export const game = {
  canvas: {
    width: 800,
    height: 600,
  },
  session: {
    durationMs: 60000,
  },
  surfer: {
    width: 40,
    height: 60,
    speed: 5,
  },
  wave: {
    radius: 20,
    spawnInterval: 2000,
    types: {
      blue: {
        points: 10,
        weight: 0.7,
      },
      gold: {
        points: 50,
        weight: 0.2,
      },
      red: {
        points: -20,
        weight: 0.1,
      },
    },
  },
};
