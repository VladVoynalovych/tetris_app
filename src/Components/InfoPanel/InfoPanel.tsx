import './index.css';

export const InfoPanel = () => {
  return (
    <div className='info-panel'>
      <div className='score-wrapper'>
        <span className='score'>Score: 10</span>
      </div>

      <div className='rows-deleted-wrapper'>
        <span className='rows-deleted'>Rows Deleted: 10</span>
      </div>

      <div className='level-wrapper'>
        <span className='level'>Level: 1</span>
      </div>

      <div className='next-figure-wrapper'>
        <span className='level'>Next figure</span>
      </div>
    </div>
  );
};
