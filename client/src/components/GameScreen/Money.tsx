import React from 'react';
import {
  IMoneyCard,
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  ICard
} from './interfaces';
import MoneyCard from '../Card/MoneyCard';
import Card from '../Card';
import { getType } from './helpers';
import PropertyCard from '../Card/PropertyCard';
import PropertyWildcard from '../Card/PropertyWildcard';
import RentCard from '../Card/RentCard';
import ActionCard from '../Card/ActionCard';

interface IProps {
  money: IMoneyCard[];
}

const Money: React.FC<IProps> = ({ money }) => {
  return (
    <div className='money'>
      {money.map((card) => {
        switch (getType(card)) {
          case 'PropertyCard':
            return (
              <div key={card.id} className='card-wrapper'>
                <Card card={card}>
                  <PropertyCard card={card as IPropertyCard} />
                </Card>
              </div>
            );
          case 'PropertyWildcard':
            return (
              <div key={card.id} className='card-wrapper'>
                <Card card={card}>
                  <PropertyWildcard card={card as IPropertyWildcard} />
                </Card>
              </div>
            );
          case 'MoneyCard':
            return (
              <div key={card.id} className='card-wrapper'>
                <Card card={card}>
                  <MoneyCard card={card as IMoneyCard} />
                </Card>
              </div>
            );
          case 'RentCard':
            return (
              <div key={card.id} className='card-wrapper'>
                <Card card={card}>
                  <RentCard card={card as IRentCard} />
                </Card>
              </div>
            );
          case 'ActionCard':
            return (
              <div key={card.id} className='card-wrapper'>
                <Card card={card}>
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

export default Money;
