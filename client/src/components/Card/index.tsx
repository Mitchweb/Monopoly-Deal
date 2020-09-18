import React from 'react';
import {
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard
} from '../GameScreen/interfaces';

interface IProps {
  onCardClick?: (
    card: IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard
  ) => void;
  card: IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard;
  classes?: string;
}

const Card: React.FC<IProps> = ({ onCardClick, card, classes, children }) => {
  return onCardClick ? (
    <div onClick={() => onCardClick(card)} className={`card ${classes}`}>
      {children}
    </div>
  ) : (
    <div className='card'>{children}</div>
  );
};

export default Card;
