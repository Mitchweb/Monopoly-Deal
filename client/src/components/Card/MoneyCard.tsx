import React from 'react';
import { IMoneyCard } from '../GameScreen/interfaces';

interface IProps {
  card: IMoneyCard;
}

const MoneyCard: React.FC<IProps> = ({ card }) => {
  return (
    <div className={`card__money-card card__money-card--value-${card.value}`}>
      <div className='card-value card-value--top'>${card.value}</div>
      <div className='card-border'>
        <div className='card-circle card-circle__money-card'>${card.value}</div>
      </div>
      <div className='card-value card-value--bottom'>${card.value}</div>
    </div>
  );
};

export default MoneyCard;
