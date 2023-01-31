import './index.css';
import { Playground } from '../Playground/Playground';
import { InfoPanel } from '../InfoPanel/InfoPanel';
import { useEffect, useState } from 'react';
import { deleteFilledRows, getRandomFigure, setupFigure } from '../../Extensions/FigureGenerator';
import {
  checkCollision,
  moveFigureDown,
  moveFigureLeft,
  moveFigureRight,
  rotateFigure,
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

export const GameWrapper = () => {
  const [{ figure, playground }, setGameState] = useState(() => ({
    figure: getRandomFigure(),
    playground: emptyPlayground,
  }));

  const moveDown = () => {
    setGameState(({ figure, playground }) => {
      if (!checkCollision(playground, moveFigureDown(figure))) {
        return { figure: moveFigureDown(figure), playground };
      } else {
        let updatedPlayground = setupFigure(playground, figure);
        updatedPlayground = deleteFilledRows(updatedPlayground);
        return { figure: getRandomFigure(), playground: updatedPlayground };
      }
    });
  };

  useEffect(() => {
    const gameLoopId = setInterval(moveDown, 500);
    return () => {
      clearInterval(gameLoopId);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowRight':
          setGameState((gameState) => {
            if (!checkCollision(gameState.playground, moveFigureRight(gameState.figure))) {
              return { ...gameState, figure: moveFigureRight(gameState.figure) };
            }
            return gameState;
          });

          break;
        case 'ArrowLeft':
          setGameState((gameState) => {
            if (!checkCollision(gameState.playground, moveFigureLeft(gameState.figure))) {
              return { ...gameState, figure: moveFigureLeft(gameState.figure) };
            }
            return gameState;
          });
          break;
        case 'ArrowUp':
          setGameState((gameState) => {
            if (!checkCollision(gameState.playground, rotateFigure(gameState.figure))) {
              return { ...gameState, figure: rotateFigure(gameState.figure) };
            }
            return gameState;
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className='game-wrapper'>
      <h1>TETRIS</h1>

      <div className='wrapper'>
        <Playground playfield={playground} figure={figure} />
        <InfoPanel />
      </div>
    </div>
  );
};
