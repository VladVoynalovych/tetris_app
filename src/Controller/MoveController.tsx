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
  const rotationIndex = (figure.rotationIndex + 1) % figure.rotations.length;

  return {
    coords: figure.coords,
    rotations: figure.rotations,
    isFixed: figure.isFixed,
    blocks: figure.rotations[rotationIndex],
    rotationIndex,
  };
};
