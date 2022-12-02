export const SCORE = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
  loss: 0,
  draw: 3,
  win: 6,
};

export const NORMAL_GAME_RESULT = {
  A: {
    X: "draw",
    Y: "win",
    Z: "loss",
  },
  B: {
    X: "loss",
    Y: "draw",
    Z: "win",
  },
  C: {
    X: "win",
    Y: "loss",
    Z: "draw",
  },
};

export const DESIRED_RESULT = {
  X: "loss",
  Y: "draw",
  Z: "win",
};

export const GAME_RESULT_PART2 = {
  A: {
    X: "Z",
    Y: "X",
    Z: "Y",
  },
  B: {
    X: "X",
    Y: "Y",
    Z: "Z",
  },
  C: {
    X: "Y",
    Y: "Z",
    Z: "X",
  },
};
