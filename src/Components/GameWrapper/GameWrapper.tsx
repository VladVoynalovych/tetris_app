import './index.css';
import { Playground } from '../Playground/Playground';
import { InfoPanel } from '../InfoPanel/InfoPanel';

import { useEffect, useState } from 'react';
import { deleteFilledRows, getRandomFigure, setupFigure, EMPTY_FIGURE } from '../../Extensions/FigureGenerator';
import {
  checkCollision,
  moveFigureDown,
  moveFigureLeft,
  moveFigureRight,
  rotateFigure,
} from '../../Controller/MoveController';
import { calculateScore, calculateLevel, calculateSpeed, GameStatus } from '../../Controller/GameController';
import { PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH, POINT_PER_FIGURE, POINTS_PER_LINE } from '../../utils/Constants';

const initialState = {
  figure: EMPTY_FIGURE,
  playground: new Array(PLAYGROUND_HEIGHT).fill(new Array(PLAYGROUND_WIDTH).fill(0)),
  score: 0,
  level: 1,
  rowsDeleted: 0,
  speed: calculateSpeed(1),
  gameStatus: 'initial' as GameStatus,
};

export const GameWrapper = () => {
  const [{ figure, playground, score, level, rowsDeleted, speed, gameStatus }, setGameState] = useState(initialState);

  const moveDown = () => {
    setGameState(({ figure, playground, score, level, rowsDeleted, speed, gameStatus }) => {
      if (!checkCollision(playground, moveFigureDown(figure))) {
        return { figure: moveFigureDown(figure), playground, score, level, rowsDeleted, speed, gameStatus };
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

        let newFigure = getRandomFigure();

        if (!checkCollision(playground, { ...newFigure, coords: { x: newFigure.coords.x, y: 2 } })) {
          return {
            figure: newFigure,
            playground: updatedPlayground,
            score: newScore,
            level: newLevel,
            rowsDeleted: rowsDeleted + removalResult.deletedRowsCount,
            speed: calculateSpeed(newLevel),
            gameStatus,
          };
        } else {
          return {
            figure,
            playground,
            score,
            level,
            rowsDeleted,
            speed,
            gameStatus: 'gameOver',
          };
        }
      }
    });
  };

  useEffect(() => {
    if (gameStatus !== 'playing') return;
    const intervalId = setInterval(moveDown, speed);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStatus, speed]);

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
        case 'KeyP':
          setGameState((gameState) => {
            switch (gameState.gameStatus) {
              case 'playing':
                return { ...gameState, gameStatus: 'pause' };
              case 'initial':
                return { ...gameState, gameStatus: 'playing', figure: getRandomFigure() };
              default:
                return { ...gameState, gameStatus: 'playing' };
            }
          });
          break;
        case 'Enter':
          setGameState((gameState) => {
            if (gameState.gameStatus === 'gameOver') {
              return {
                ...initialState,
                gameStatus: 'playing',
              };
            } else {
              return gameState;
            }
          });
          break;
        case 'KeyR':
          setGameState(initialState);
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
        <Playground playfield={playground} figure={figure} gameStatus={gameStatus} />
        <InfoPanel score={score} level={level} rowsDeleted={rowsDeleted} />
      </div>
    </div>
  );
};
