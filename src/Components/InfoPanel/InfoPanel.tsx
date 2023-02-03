import './index.css';
import { CameraControl } from '../CameraControl/CameraControl';
import { useState } from 'react';

type PropType = {
  score: number;
  level: number;
  rowsDeleted?: number;
};

export const InfoPanel = ({ score, level, rowsDeleted = 0 }: PropType) => {
  const [isCameraVisible, setCameraVisibility] = useState(false);
  const changeCameraVisibility = () => {
    setCameraVisibility((visibility) => !visibility);
  };

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

      <label>
        <span>Is camera Enabled: </span>
        <input type='checkbox' checked={isCameraVisible} onChange={changeCameraVisibility} />
      </label>

      {isCameraVisible && <CameraControl />}
    </div>
  );
};
