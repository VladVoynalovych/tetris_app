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
import { calculateScore, calculateLevel, calculateSpeed } from '../../Controller/GameController';
import { POINT_PER_FIGURE, POINTS_PER_LINE } from '../../utils/Constants';

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
  const [{ figure, playground, score, level, rowsDeleted, speed }, setGameState] = useState(() => ({
    figure: getRandomFigure(),
    playground: emptyPlayground,
    score: 0,
    level: 1,
    rowsDeleted: 0,
    speed: calculateSpeed(1),
  }));

  const moveDown = () => {
    setGameState(({ figure, playground, score, level, rowsDeleted, speed }) => {
      if (!checkCollision(playground, moveFigureDown(figure))) {
        return { figure: moveFigureDown(figure), playground, score, level, rowsDeleted, speed };
      } else {
        let updatedPlayground = setupFigure(playground, figure);
        let removalResult = deleteFilledRows(updatedPlayground);
        let newScore =
          removalResult.deletedRowsCount > 0
            ? calculateScore(score, removalResult.deletedRowsCount * POINTS_PER_LINE)
            : calculateScore(score, POINT_PER_FIGURE);
        let newLevel =
          rowsDeleted + removalResult.deletedRowsCount === rowsDeleted
            ? level
            : calculateLevel(rowsDeleted + removalResult.deletedRowsCount, level);

        updatedPlayground = removalResult.gameBoard;

        return {
          figure: getRandomFigure(),
          playground: updatedPlayground,
          score: newScore,
          level: newLevel,
          rowsDeleted: rowsDeleted + removalResult.deletedRowsCount,
          speed: calculateSpeed(newLevel),
        };
      }
    });
  };

  useEffect(() => {
    const gameLoopId = setInterval(moveDown, speed);
    return () => {
      clearInterval(gameLoopId);
    };
  }, [speed]);

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
        <InfoPanel score={score} level={level} rowsDeleted={rowsDeleted} />
      </div>
    </div>
  );
};
