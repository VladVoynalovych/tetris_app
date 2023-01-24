const FIGURE_ALPHABET = ['I', 'O', 'T', 'J', 'L', 'S', 'Z'] as const;
type FigureLetter = (typeof FIGURE_ALPHABET)[number];

type Figure = {
  coords: {
    x: number;
    y: number;
  };
  isFixed: boolean;
  blocks: readonly (readonly number[])[];
};

const FIGURES: Record<FigureLetter, Readonly<Figure>> = {
  I: {
    coords: {
      x: 3,
      y: 0,
    },
    isFixed: false,
    blocks: [[1, 1, 1, 1]],
  },
  O: {
    coords: {
      x: 4,
      y: 0,
    },
    isFixed: false,
    blocks: [
      [1, 1],
      [1, 1],
    ],
  },
  T: {
    coords: {
      x: 4,
      y: 0,
    },
    isFixed: false,
    blocks: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  J: {
    coords: {
      x: 4,
      y: 0,
    },
    isFixed: false,
    blocks: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  L: {
    coords: {
      x: 4,
      y: 0,
    },
    isFixed: false,
    blocks: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  S: {
    coords: {
      x: 4,
      y: 0,
    },
    isFixed: false,
    blocks: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  Z: {
    coords: {
      x: 4,
      y: 0,
    },
    isFixed: false,
    blocks: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
} as const;
const randomizer = () => {
  return Math.floor(Math.random() * (FIGURE_ALPHABET.length - 1));
};

export const getRandomFigure = () => {
  const figureIndex = randomizer();
  const figureSymbol = FIGURE_ALPHABET[figureIndex];

  return FIGURES[figureSymbol];
};

export const setupFigure = (gameBoard: number[][], figure: Figure) => {
  let updatedGameBoard = gameBoard.slice();
  let {
    coords: { x, y },
  } = figure;
  for (let row = y; row < figure.blocks.length; row++) {
    for (let col = x; col < figure.blocks[y].length + x; col++) {
      updatedGameBoard[row][col] = figure.blocks[row - y][col - x];
    }
  }

  return updatedGameBoard;
};