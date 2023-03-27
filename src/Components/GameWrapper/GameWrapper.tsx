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
import {
  calculateScore,
  calculateLevel,
  calculateSpeed,
  GameStatus,
  calculatePoints,
} from '../../Controller/GameController';
import { PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH, POINT_PER_FIGURE } from '../../utils/Constants';
import { CameraControl } from '../CameraControl/CameraControl';

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
  const [isCameraVisible, setCameraVisibility] = useState(false);

  const changeCameraVisibility = () => {
    setCameraVisibility((visibility) => !visibility);
  };

  const arrowRight = () => {
    setGameState((gameState) => {
      if (!checkCollision(gameState.playground, moveFigureRight(gameState.figure))) {
        return { ...gameState, figure: moveFigureRight(gameState.figure) };
      }
      return gameState;
    });
  };

  const arrowLeft = () => {
    setGameState((gameState) => {
      if (!checkCollision(gameState.playground, moveFigureLeft(gameState.figure))) {
        return { ...gameState, figure: moveFigureLeft(gameState.figure) };
      }
      return gameState;
    });
  };

  const arrowUp = () => {
    setGameState((gameState) => {
      if (!checkCollision(gameState.playground, rotateFigure(gameState.figure))) {
        return { ...gameState, figure: rotateFigure(gameState.figure) };
      }
      return gameState;
    });
  };

  const moveDown = () => {
    setGameState(({ figure, playground, score, level, rowsDeleted, speed, gameStatus }) => {
      if (!checkCollision(playground, moveFigureDown(figure))) {
        return { figure: moveFigureDown(figure), playground, score, level, rowsDeleted, speed, gameStatus };
      } else {
        let updatedPlayground = setupFigure(playground, figure);
        let removalResult = deleteFilledRows(updatedPlayground);
        let newScore =
          removalResult.deletedRowsCount > 0
            ? calculateScore(score, calculatePoints(removalResult.deletedRowsCount)) + POINT_PER_FIGURE
            : calculateScore(score, POINT_PER_FIGURE);
        let newLevel =
          rowsDeleted + removalResult.deletedRowsCount === rowsDeleted
            ? level
            : calculateLevel(rowsDeleted + removalResult.deletedRowsCount, level);

        updatedPlayground = removalResult.gameBoard;

        let newFigure = getRandomFigure();

        if (!checkCollision(playground, { ...newFigure, coords: { x: newFigure.coords.x, y: 0 } })) {
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
            figure: EMPTY_FIGURE,
            playground: updatedPlayground,
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

  const controls = {
    arrowRight,
    arrowLeft,
    arrowUp,
    arrowDown: moveDown,
  };

  console.log('');

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
                figure: getRandomFigure(),
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

        <aside>
          <InfoPanel score={score} level={level} rowsDeleted={rowsDeleted} />
          <label>
            <span>Is camera Enabled: </span>
            <input type='checkbox' checked={isCameraVisible} onChange={changeCameraVisibility} />
          </label>

          {isCameraVisible && <CameraControl controls={controls} />}
        </aside>
      </div>
    </div>
  );
};
