import './index.css';
import React, { useEffect, useState } from 'react';
import { Figure, getRandomFigure } from '../../Extensions/FigueGenerator';
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
    const buttonKey = e.code;
    console.log(e.code);

    let movedFigure: Figure;
    switch (buttonKey) {
      case 'ArrowDown':
        if (checkCollision(playground, figure) !== 'bottom') {
          movedFigure = moveFigureDown(figure);
          setFigure(movedFigure);
        }
        break;
      case 'ArrowRight':
        if (checkCollision(playground, figure) !== 'right') {
          movedFigure = moveFigureRight(figure);
          setFigure(movedFigure);
        }
        break;
      case 'ArrowLeft':
        if (checkCollision(playground, figure) !== 'left') {
          movedFigure = moveFigureLeft(figure);
          setFigure(movedFigure);
        }
        break;
      case 'ArrowUp':
        movedFigure = rotateFigure(figure);
        setFigure(movedFigure);
        break;
    }
  };

  useEffect(() => {
    window.onkeydown = handleKeyPress;
  });

  const [playground] = useState(emptyPlayground);
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
