import React from 'react';
import { IPropertyWildcard } from '../GameScreen/interfaces';
import sets from '../../helpers/card';

interface IProps {
  card: IPropertyWildcard;
}

const PropertyWildcard: React.FC<IProps> = ({ card }) => {
  function renderContents() {
    if (card.isAllSets) {
      return (
        <div className='property-wildcard__all'>
          <div className='property-wildcard__all-box'>
            <div>Property Wild Card</div>
          </div>
          <div className='property-wildcard__all-subtext'>
            This card can be used as part of any property set. This card has no monetary value.
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className='card-value card-value--top'>${card.value}</div>
        <div className='property-wildcard__contents'>
          <div className={`property-wildcard__name property-wildcard__name__set--${card.setOne}`}>
            Property
            <br />
            <span className='text--big'>Wild Card</span>
          </div>
          <div className='property-wildcard__rent-container'>
          <ul className={`property-card__rent set--${card.setTwo}`}>
              {sets[card.setTwo].rent.map((value, index) => (
                <li key={value}>
                  <div className='rent__index'>{index + 1}</div>
                  <div className='rent__value'>${value}</div>
                </li>
              ))}
            </ul>
            <ul className={`property-card__rent set--${card.setOne}`}>
              {sets[card.setOne].rent.map((value, index) => (
                <li key={value}>
                  <div className='rent__index'>{index + 1}</div>
                  <div className='rent__value'>${value}</div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`property-wildcard__name property-wildcard__name--bottom property-wildcard__name--bottom property-wildcard__name__set--${card.setTwo}`}
          >
            Property
            <br />
            <span className='text--big'>Wild Card</span>
          </div>
        </div>
        <div className='card-value card-value--bottom'>${card.value}</div>
      </React.Fragment>
    );
  }

  return <div className='card__property-wildcard'>{renderContents()}</div>;
};

export default PropertyWildcard;
