import React from 'react';

interface IProps {
  action: number;
}

const ActionPendingModal: React.FC<IProps> = ({ action }) => {
  function renderAction() {
    switch (action) {
      case 2:
        return "It's My Birthday!";
      case 3:
        return 'Debt Collector';
      case 4:
        return 'Forced Deal';
      case 5:
        return 'Sly Deal';
      case 6:
        return 'House';
      case 7:
        return 'Hotel';
      case 9:
        return 'Deal Breaker';
      case 10:
        return 'Rent';
    }
  }

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>Action in play</h3>
      <h2 className='action-modal__title'>{renderAction()}</h2>
      <p className='action-modal__message'>Waiting for players&hellip;</p>
    </div>
  );
};

export default ActionPendingModal;
