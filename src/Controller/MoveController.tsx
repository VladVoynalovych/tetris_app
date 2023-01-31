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
  const rotationIndex = (figure.rotationIndex + 1) % figure.rotations.length;

  return {
    coords: figure.coords,
    rotations: figure.rotations,
    isFixed: figure.isFixed,
    blocks: figure.rotations[rotationIndex],
    rotationIndex,
  };
};

export const checkCollision = (gameboard: Gameboard, figure: Figure) => {
  for (let row = figure.coords.y; row < figure.coords.y + figure.blocks.length + 1; row++) {
    for (let col = figure.coords.x; col <= figure.coords.x + figure.blocks[0].length; col++) {
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
