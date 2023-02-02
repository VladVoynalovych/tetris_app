import { Modal } from '../Modal/Modal';

export const GameOverModal = () => {
  return (
    <Modal>
      Game Over!
      <br />
      Press <span className='blink'>ENTER</span> to play again.
    </Modal>
  );
};
