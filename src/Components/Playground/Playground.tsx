import './index.css';
import React, { useEffect, useState } from 'react';
import { getRandomFigure } from '../../Extensions/FigueGenerator';
import { moveFigureDown, moveFigureRight, moveFigureLeft, rotateFigure } from '../../Controller/MoveController';

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
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowDown':
          setFigure((prevState) => moveFigureDown(prevState));
          break;
        case 'ArrowRight':
          setFigure((prevState) => moveFigureRight(prevState));
          break;
        case 'ArrowLeft':
          setFigure((prevState) => moveFigureLeft(prevState));
          break;
        case 'ArrowUp':
          setFigure((prevState) => rotateFigure(prevState));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

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
