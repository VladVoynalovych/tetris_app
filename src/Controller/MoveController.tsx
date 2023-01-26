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
  for (let row = 0; row < gameboard.length; row++) {
    for (let col = 0; col < gameboard[row].length; col++) {
      if (
        (gameboard[row][col] === 1 && figure.blocks[row - figure.coords.y]?.[col - figure.coords.x] === 1) ||
        figure.coords.x < 0 ||
        figure.coords.x + figure.blocks[0].length > gameboard[0].length
      ) {
        return 'side';
      }

      if (
        (gameboard[row][col] === 1 && figure.blocks[row - figure.coords.y]?.[col - figure.coords.x] === 1) ||
        (figure.coords.y + figure.blocks.length >= gameboard.length &&
          figure.blocks[row - figure.coords.y - 1]?.[col - figure.coords.x] === undefined)
      ) {
        return 'bottom';
      }
    }
  }
};
