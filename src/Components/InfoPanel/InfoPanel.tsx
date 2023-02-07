import './index.css';

type PropType = {
  score: number;
  level: number;
  rowsDeleted?: number;
};

export const InfoPanel = ({ score, level, rowsDeleted = 0 }: PropType) => {
  return (
    <div className='info-panel'>
      <div className='score-wrapper'>
        <span className='score'>Score: {score}</span>
      </div>

      <div className='rows-deleted-wrapper'>
        <span className='rows-deleted'>Rows Deleted: {rowsDeleted}</span>
      </div>

      <div className='level-wrapper'>
        <span className='level'>Level: {level}</span>
      </div>
    </div>
  );
};
