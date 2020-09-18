import React from 'react';

interface IProps {
  onUnselectCard: () => void;
}

const ModalCardSummaryCancelButton: React.FC<IProps> = ({ onUnselectCard }) => {
  return (
    <button
      onClick={() => {
        onUnselectCard();
      }}
      className='modal--card__button button--cancel'
      type='button'
    >
      Cancel
    </button>
  );
};

export default ModalCardSummaryCancelButton;
