import React from 'react';

interface IProps {}

const JustSayNoPendingModal: React.FC<IProps> = () => {
  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>You played a</h3>
      <h2 className='action-modal__title'>Just Say No!</h2>
      <p className='action-modal__message'>Waiting for player&hellip;</p>
    </div>
  );
};

export default JustSayNoPendingModal;
