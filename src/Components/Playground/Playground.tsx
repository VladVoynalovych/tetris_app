import './index.css';
import React from 'react';
import { Figure } from '../../Extensions/FigureGenerator';
import { GameStatus } from '../../Controller/GameController';
import { PauseModal } from '../PauseModal/PauseModal';
import { GameOverModal } from '../GameOverModal/GameOverModal';
import { InitialModal } from '../InitialModal/InitialModal';

type PropType = {
  playfield: number[][];
  figure: Figure;
  gameStatus: GameStatus;
};

export const Playground = ({ playfield, figure, gameStatus }: PropType) => {
  return (
    <div className='playground'>
      <div className='net'>
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
      {gameStatus === 'paused' && <PauseModal />}
      {gameStatus === 'gameOver' && <GameOverModal />}
      {gameStatus === 'initial' && <InitialModal />}
    </div>
  );
};
