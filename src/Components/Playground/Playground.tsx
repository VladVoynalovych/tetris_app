import './index.css';
import React, { useEffect, useState } from 'react';
import { deleteFilledRows, getRandomFigure, setupFigure } from '../../Extensions/FigureGenerator';
import {
  moveFigureDown,
  moveFigureRight,
  moveFigureLeft,
  rotateFigure,
  checkCollision,
} from '../../Controller/MoveController';

const emptyPlayground = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const Playground = () => {
  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowDown':
        if (!checkCollision(playground, moveFigureDown(figure))) {
          setFigure(moveFigureDown(figure));
        } else {
          let updatedPlayground = setupFigure(playground, figure);
          updatedPlayground = deleteFilledRows(updatedPlayground);
          setPlayground(updatedPlayground);
          setFigure(getRandomFigure());
        }
        break;
      case 'ArrowRight':
        if (!checkCollision(playground, moveFigureRight(figure))) {
          setFigure(moveFigureRight(figure));
        }
        break;
      case 'ArrowLeft':
        if (!checkCollision(playground, moveFigureLeft(figure))) {
          setFigure(moveFigureLeft(figure));
        }
        break;
      case 'ArrowUp':
        if (!checkCollision(playground, rotateFigure(figure))) {
          setFigure(rotateFigure(figure));
        }
        break;
    }
  };

  useEffect(() => {
    window.onkeydown = handleKeyPress;
  });

  const [playground, setPlayground] = useState(emptyPlayground);
  const [figure, setFigure] = useState(getRandomFigure());

  return (
    <div className='playground'>
      {playground.map((row, rowIndex) => {
        return (
          <div className='row' key={`row-${rowIndex}`}>
            {row.map((cell, colIndex) => {
              const isFilled =
                cell === 1 || figure.blocks[rowIndex - figure.coords.y]?.[colIndex - figure.coords.x] === 1;

              return (
                <div key={`row-${rowIndex}-cell-${colIndex}`} className={`cell${isFilled ? ' filled' : ''}`}></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
