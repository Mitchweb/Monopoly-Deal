import React from 'react';
import { getType } from './helpers';
import {
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard
} from './interfaces';
import Card from '../Card';
import PropertyCard from '../Card/PropertyCard';
import PropertyWildcard from '../Card/PropertyWildcard';
import MoneyCard from '../Card/MoneyCard';
import RentCard from '../Card/RentCard';
import ActionCard from '../Card/ActionCard';

interface IProps {
  onCardClick: (
    card: IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard
  ) => void;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
}

const Hand: React.FC<IProps> = ({ onCardClick, hand }) => {
  return (
    <div className='hand'>
      {hand.map((card) => {
        switch (getType(card)) {
          case 'PropertyCard':
            return (
              <div key={card.id} className='card-wrapper'>
                <Card onCardClick={onCardClick} card={card}>
                  <PropertyCard card={card as IPropertyCard} />
                </Card>
              </div>
            );
          case 'PropertyWildcard':
            return (
              <div key={card.id} className='card-wrapper'>
                <Card onCardClick={onCardClick} card={card}>
                  <PropertyWildcard card={card as IPropertyWildcard} />
                </Card>
              </div>
            );
          case 'MoneyCard':
            return (
              <div key={card.id} className='card-wrapper'>
                <Card onCardClick={onCardClick} card={card}>
                  <MoneyCard card={card as IMoneyCard} />
                </Card>
              </div>
            );
          case 'RentCard':
            return (
              <div key={card.id} className='card-wrapper'>
                <Card onCardClick={onCardClick} card={card}>
                  <RentCard card={card as IRentCard} />
                </Card>
              </div>
            );
          case 'ActionCard':
            return (
              <div key={card.id} className='card-wrapper'>
                <Card onCardClick={onCardClick} card={card}>
                  <ActionCard card={card as IActionCard} />
                </Card>
              </div>
            );
          default:
            return 'Uh oh!';
        }
      })}
    </div>
  );
};

export default Hand;
