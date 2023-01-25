import { Figure } from '../Extensions/FigueGenerator';
import { Gameboard } from '../Components/Playground/Types';

export const moveFigureLeft = (figure: Figure) => {
  return { ...figure, coords: { x: figure.coords.x - 1, y: figure.coords.y } };
};

export const moveFigureRight = (figure: Figure) => {
  return { ...figure, coords: { x: figure.coords.x + 1, y: figure.coords.y } };
};

export const moveFigureDown = (figure: Figure) => {
  return { ...figure, coords: { y: figure.coords.y + 1, x: figure.coords.x } };
};

export const rotateFigure = (figure: Figure) => {
  const rotatedFigure = { ...figure };
  const { rotationIndex } = figure;
  const rotationsLength = figure.rotations.length - 1;

  if (rotationIndex < rotationsLength) {
    rotatedFigure.rotationIndex += 1;
  } else {
    rotatedFigure.rotationIndex = 0;
  }
  console.log(rotatedFigure);
  rotatedFigure.blocks = rotatedFigure.rotations[rotatedFigure.rotationIndex];

  return rotatedFigure;
};

export const checkCollision = (gameboard: Gameboard, figure: Figure) => {
  let {
    coords: { x, y },
  } = figure;
  y = y < 0 ? 0 : y;

  for (let row = y; row < figure.blocks.length; row++) {
    for (let col = x; col < figure.blocks[row].length + x; col++) {
      console.log(gameboard[row + 1][col], 'here:', row + 1);

      if (gameboard[row][col - 1] === undefined || gameboard[row][col - 1] === 1) {
        return 'left';
      }
      if (gameboard[row][col + 1] === undefined || gameboard[row][col + 1] === 1) {
        return 'right';
      }

      if (gameboard[row + 1][col] === undefined || gameboard[row + 1][col] === 1) {
        console.log(gameboard[row + 1][col]);
        return 'bottom';
      }
    }
  }
};
