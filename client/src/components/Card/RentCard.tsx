import React from 'react';
import { IRentCard } from '../GameScreen/interfaces';

interface IProps {
  card: IRentCard;
}

const RentCard: React.FC<IProps> = ({ card }) => {
  return (
    <div className={`card__rent-card ${card.isAllSets ? 'rent-card--all' : ''}`}>
      <div className='card-value card-value--top'>${card.value}</div>
      <div className='card-border'>
        <div className='rent-card__contents'>
          <div className='card-title'>ACTION CARD</div>
          <div className='card-circle card-circle__rent-card'>
            <div className={`rent-card__decoration-top set--${card.setOne}`}></div>
            <div className={`rent-card__decoration-bottom set--${card.setTwo}`}></div>
            <div className='rent-card__title'>RENT</div>
          </div>
          {card.isAllSets ? (
            <div className='card-subtext'>
              Force one player to pay you rent for properties you own in one colour.
            </div>
          ) : (
            <div className='card-subtext'>
              All players pay you rent for properties you own in one of these colours.
            </div>
          )}
        </div>
      </div>
      <div className='card-value card-value--bottom'>${card.value}</div>
    </div>
  );
};

export default RentCard;
