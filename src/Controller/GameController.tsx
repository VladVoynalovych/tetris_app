import { LEVEL_UP_ROW_COUNT, MAX_LEVEL } from '../utils/Constants';

export type GameStatus = 'initial' | 'pause' | 'playing' | 'gameOver';

export const calculateScore = (currentScore: number, points: number) => {
  return currentScore + points;
};

export const calculatePoints = (rowsDeleted: number): number => {
  return [0, 100, 300, 700, 1500][rowsDeleted];
};

export const calculateLevel = (rowsDeleted: number, currentLevel: number) => {
  if (currentLevel < MAX_LEVEL && rowsDeleted % LEVEL_UP_ROW_COUNT === 0 && rowsDeleted !== 0) {
    return currentLevel + 1;
  } else {
    return currentLevel;
  }
};

export const calculateSpeed = (level: number) => {
  return (0.8 - (level - 1) * 0.007) ** (level - 1) * 1000;
};
