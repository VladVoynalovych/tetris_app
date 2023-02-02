import './index.css';
import React from 'react';
import { Figure } from '../../Extensions/FigureGenerator';

type PropType = {
  playfield: number[][];
  figure: Figure;
};

export const Playground = ({ playfield, figure }: PropType) => {
  return (
    <div className='playground'>
      {playfield.map((row, rowIndex) => {
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
