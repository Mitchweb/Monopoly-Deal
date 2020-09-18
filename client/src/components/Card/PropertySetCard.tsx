import React from 'react';
import sets from '../../helpers/card';

interface IProps {
  set: number;
}

const PropertySetCard: React.FC<IProps> = ({ set }) => {
  return (
    <div className={`card__property-card card__property-card__set--${set}`}>
      <div className='property-card__contents'>
        <div className='property-card__name'>PROPERTY SET</div>
        <ul className='property-card__rent'>
          {sets[set].rent.map((value, index) => (
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

export default PropertySetCard;
