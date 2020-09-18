import React from 'react';
import { IPropertyWildcard } from '../GameScreen/interfaces';
import sets from '../../helpers/card';

interface IProps {
  card: IPropertyWildcard;
  isRotated: boolean;
}

const PropertyWildcardHidden: React.FC<IProps> = ({ card, isRotated }) => {
  function renderRentContainer() {
    if (isRotated) {
      return (
        <div className='property-wildcard__rent-container'>
          <ul className={`property-card__rent set--${card.setTwo}`}>
            {sets[card.setTwo].rent.map((value, index) => (
              <li key={value}>
                <div className='rent__index'>{index + 1}</div>
                <div className='rent__value'>${value}</div>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className='property-wildcard__rent-container'>
        <ul className={`property-card__rent set--${card.setOne}`}>
          {sets[card.setOne].rent.map((value, index) => (
            <li key={value}>
              <div className='rent__index'>{index + 1}</div>
              <div className='rent__value'>${value}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className='card__property-wildcard'>
      <div className='card-value card-value--top'>${card.value}</div>
      <div className='property-wildcard__contents'>
        <div
          className={`property-wildcard__name property-wildcard__name__set--${
            isRotated ? card.setTwo : card.setOne
          }`}
        >
          Property
          <br />
          <span className='text--big'>Wild Card</span>
        </div>
        {renderRentContainer()}
      </div>
    </div>
  );
};

export default PropertyWildcardHidden;
