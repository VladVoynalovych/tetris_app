import { Figure } from '../Extensions/FigueGenerator';

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
