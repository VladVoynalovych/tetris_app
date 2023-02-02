import { ReactNode } from 'react';
import './index.css';

export const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className='modal'>
      <p>{children}</p>
    </div>
  );
};
