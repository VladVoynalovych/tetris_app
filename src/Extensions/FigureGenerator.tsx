import { PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT } from '../utils/Constants';

const FIGURE_ALPHABET = ['I', 'O', 'T', 'J', 'L', 'S', 'Z'] as const;
type FigureLetter = (typeof FIGURE_ALPHABET)[number];

export type Figure = {
  coords: {
    x: number;
    y: number;
  };
  isFixed: boolean;
  blocks: readonly (readonly number[])[];
  rotations: readonly (readonly (readonly number[])[])[];
  rotationIndex: number;
};

const FIGURES: Record<FigureLetter, Readonly<Figure>> = {
  I: {
    coords: {
      x: 3,
      y: -1,
    },
    isFixed: false,
    rotationIndex: 0,
    get blocks() {
      return this.rotations[this.rotationIndex];
    },
    rotations: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
    ],
  },
  O: {
    coords: {
      x: 4,
      y: -1,
    },
    isFixed: false,
    rotationIndex: 0,
    get blocks() {
      return this.rotations[this.rotationIndex];
    },
    rotations: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
  },
  T: {
    coords: {
      x: 4,
      y: -1,
    },
    isFixed: false,
    rotationIndex: 0,
    get blocks() {
      return this.rotations[this.rotationIndex];
    },
    rotations: [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  J: {
    coords: {
      x: 4,
      y: -1,
    },
    isFixed: false,
    rotationIndex: 0,
    get blocks() {
      return this.rotations[this.rotationIndex];
    },
    rotations: [
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    ],
  },
  L: {
    coords: {
      x: 4,
      y: -1,
    },
    isFixed: false,
    rotationIndex: 0,
    get blocks() {
      return this.rotations[this.rotationIndex];
    },
    rotations: [
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  S: {
    coords: {
      x: 4,
      y: -1,
    },
    isFixed: false,
    rotationIndex: 0,
    get blocks() {
      return this.rotations[this.rotationIndex];
    },
    rotations: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  Z: {
    coords: {
      x: 4,
      y: -1,
    },
    isFixed: false,
    rotationIndex: 0,
    get blocks() {
      return this.rotations[this.rotationIndex];
    },
    rotations: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
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

const copyGameBoard = (gameBoard: number[][]) => {
  return gameBoard.map((row) => [...row]);
};

export const setupFigure = (gameBoard: number[][], figure: Figure) => {
  let updatedGameBoard = copyGameBoard(gameBoard);

  for (let row = 0; row < PLAYGROUND_HEIGHT; row++) {
    for (let col = 0; col <= PLAYGROUND_WIDTH; col++) {
      if (updatedGameBoard[row][col] !== 1) {
        if (figure.blocks[row - figure.coords.y]?.[col - figure.coords.x] === 1) {
          updatedGameBoard[row][col] = 1;
        }
      }
    }
  }

  return updatedGameBoard;
};

const isRowFilled = (row: number[]) => {
  return row.every((cell) => cell === 1);
};

export const deleteFilledRows = (gameBoard: number[][]) => {
  let updatedGameBoard = copyGameBoard(gameBoard);

  for (let row = 0; row < PLAYGROUND_HEIGHT; row++) {
    if (isRowFilled(gameBoard[row])) {
      updatedGameBoard.splice(row, 1);
      updatedGameBoard.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }

  return updatedGameBoard;
};
