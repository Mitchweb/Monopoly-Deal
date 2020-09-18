import React from 'react';
import { IActionCard } from '../GameScreen/interfaces';

interface IProps {
  card: IActionCard;
}

const ActionCard: React.FC<IProps> = ({ card }) => {
  function renderColour() {
    switch (card.action) {
      case 0:
      case 1:
        return 'color-0';
      case 2:
        return 'color-1';
      case 3:
      case 4:
      case 5:
      case 6:
        return 'color-2';
      case 7:
      case 8:
        return 'color-3';
      case 9:
        return 'color-4';
      default:
        return 'Uh oh!';
    }
  }

  function renderTitle() {
    switch (card.action) {
      case 0:
        return 'Pass Go';
      case 1:
        return 'Double the Rent';
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
      case 8:
        return 'Just Say No!';
      case 9:
        return 'Deal Breaker';
      default:
        return 'Uh oh!';
    }
  }

  function renderSubtext() {
    switch (card.action) {
      case 0:
        return 'Draw 2 extra cards.';
      case 1:
        return 'Needs to be played with a rent card.';
      case 2:
        return "All players give you $2 as a 'gift'.";
      case 3:
        return 'Force any player to pay you $5.';
      case 4:
        return 'Swap any property with another player. (Cannot be part of a full set).';
      case 5:
        return 'Steal a property from the player of your choice. (Cannot be part of a full set.)';
      case 6:
        return 'Add onto any full set you own to add $3 to the rent value. (Except railroads and utilities.)';
      case 7:
        return 'Add onto any full set you own to add $4 to the rent value. (Except railroads and utilities.)';
      case 8:
        return 'Use any time when an action card is played against you.';
      case 9:
        return 'Steal a complete set of properties from any player. (Includes any buildings.)';
      default:
        return 'Uh oh!';
    }
  }

  return (
    <div className={`card__action-card card__action-card--${renderColour()}`}>
      <div className='card-value card-value--top'>${card.value}</div>
      <div className='card-border'>
        <div className='action-card__contents'>
          <div className='card-title'>ACTION CARD</div>
          <div className='card-circle card-circle__action-card'>
            <div
              className={`action-card__title ${
                (card.action >= 1 && card.action <= 3) || card.action === 9 ? 'title--small' : ''
              }`}
            >
              {renderTitle()}
            </div>
          </div>
          <div className='card-subtext'>{renderSubtext()}</div>
        </div>
      </div>
      <div className='card-value card-value--bottom'>${card.value}</div>
    </div>
  );
};

export default ActionCard;
