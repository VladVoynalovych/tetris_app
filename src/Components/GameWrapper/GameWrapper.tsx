import './index.css';
import { Playground } from '../Playground/Playground';
export const GameWrapper = () => {
  return (
    <div className='game-wrapper'>
      <h1>TETRIS</h1>
      <Playground />
    </div>
  );
};
