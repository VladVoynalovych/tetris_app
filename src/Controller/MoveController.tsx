import { Figure } from '../Extensions/FigureGenerator';
import { Gameboard } from '../Components/Playground/Types';
import { PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH } from '../utils/Constants';

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
  for (let row = 0; row < PLAYGROUND_HEIGHT + 1; row++) {
    for (let col = -1; col <= PLAYGROUND_WIDTH; col++) {
      if (
        (gameboard[row]?.[col] === 1 && figure.blocks[row - figure.coords.y]?.[col - figure.coords.x] === 1) ||
        (gameboard[row] === undefined && figure.blocks[row - figure.coords.y]?.[col - figure.coords.x] === 1) ||
        (gameboard[row]?.[col] === undefined && figure.blocks[row - figure.coords.y]?.[col - figure.coords.x] === 1)
      ) {
        return true;
      }
    }
  }
  return false;
};
