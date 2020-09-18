import React from 'react';

interface IProps {
  action: number;
}

const ActionModal: React.FC<IProps> = ({ action }) => {
  function renderAction() {
    switch (action) {
      case 2:
        return "It's My Birthday!";
      case 10:
        return 'Rent';
    }
  }

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>You played</h3>
      <h2 className='action-modal__title'>{renderAction()}</h2>
      <p className='action-modal__message'>Waiting for players&hellip;</p>
    </div>
  );
};

export default ActionModal;
