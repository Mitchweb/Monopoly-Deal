import React from 'react';
import { IPropertyCard } from '../GameScreen/interfaces';
import sets from '../../helpers/card';

interface IProps {
  card: IPropertyCard;
}

const PropertyCard: React.FC<IProps> = ({ card }) => {
  return (
    <div className={`card__property-card card__property-card__set--${card.set}`}>
      <div className='card-value card-value--top'>${card.value}</div>
      <div className='property-card__contents'>
        <div className='property-card__name'>{card.name}</div>
        <ul className='property-card__rent'>
          {sets[card.set].rent.map((value, index) => (
            <li key={value}>
              <div className='rent__index'>{index + 1}</div>
              <div className='rent__value'>${value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyCard;
