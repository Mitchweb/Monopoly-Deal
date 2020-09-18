import _ from 'lodash';
import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  IMoneyCard,
  IPropertySet,
  IPropertyCard,
  IPropertyWildcard,
  IRentCard,
  IActionCard
} from '../GameScreen/interfaces';
import { getType } from '../GameScreen/helpers';
import Card from '../Card';
import PropertyCard from '../Card/PropertyCard';
import PropertyWildcard from '../Card/PropertyWildcard';
import MoneyCard from '../Card/MoneyCard';
import RentCard from '../Card/RentCard';
import ActionCard from '../Card/ActionCard';
import SocketEvent from '../../helpers/SocketEvent';
import JustSayNoButton from './JustSayNoButton';

interface IProps {
  setIsJustSayNoPendingModalHidden: Dispatch<SetStateAction<boolean>>;
  socket: SocketIOClient.Socket;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
  money: IMoneyCard[];
  properties: IPropertySet[];
}

const TargetQuestionDebtCollectorModal: React.FC<IProps> = ({
  setIsJustSayNoPendingModalHidden,
  socket,
  hand,
  money,
  properties
}) => {
  const [cardIds, setCardIds] = useState<number[]>([]);

  const handleClick = (
    card: IPropertyCard | IPropertyWildcard | IMoneyCard | IRentCard | IActionCard
  ) => {
    let copyCardIds = [...cardIds];

    if (cardIds.includes(card.id)) {
      _.remove(copyCardIds, (c) => c === card.id);
    } else {
      copyCardIds.push(card.id);
    }

    setCardIds(copyCardIds);
  };

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>You are the target of</h3>
      <h2 className='action-modal__title'>Debt Collector</h2>
      <div className='money'>
        {money.map((card) => {
          switch (getType(card)) {
            case 'PropertyCard':
              return (
                <div key={card.id} className='card-wrapper'>
                  <Card
                    card={card}
                    onCardClick={handleClick}
                    classes={cardIds.includes(card.id) ? 'red-border' : ''}
                  >
                    <PropertyCard card={card as IPropertyCard} />
                  </Card>
                </div>
              );
            case 'PropertyWildcard':
              return (
                <div key={card.id} className='card-wrapper'>
                  <Card
                    card={card}
                    onCardClick={handleClick}
                    classes={cardIds.includes(card.id) ? 'red-border' : ''}
                  >
                    <PropertyWildcard card={card as IPropertyWildcard} />
                  </Card>
                </div>
              );
            case 'MoneyCard':
              return (
                <div key={card.id} className='card-wrapper'>
                  <Card
                    card={card}
                    onCardClick={handleClick}
                    classes={cardIds.includes(card.id) ? 'red-border' : ''}
                  >
                    <MoneyCard card={card as IMoneyCard} />
                  </Card>
                </div>
              );
            case 'RentCard':
              return (
                <div key={card.id} className='card-wrapper'>
                  <Card
                    card={card}
                    onCardClick={handleClick}
                    classes={cardIds.includes(card.id) ? 'red-border' : ''}
                  >
                    <RentCard card={card as IRentCard} />
                  </Card>
                </div>
              );
            case 'ActionCard':
              return (
                <div key={card.id} className='card-wrapper'>
                  <Card
                    card={card}
                    onCardClick={handleClick}
                    classes={cardIds.includes(card.id) ? 'red-border' : ''}
                  >
                    <ActionCard card={card as IActionCard} />
                  </Card>
                </div>
              );
            default:
              return 'Uh oh!';
          }
        })}
      </div>
      <div className='properties'>
        {properties.map((property) => (
          <React.Fragment key={property.set}>
            {property.cards.map((card) => {
              switch (getType(card)) {
                case 'PropertyCard':
                  return (
                    <div key={card.id} className='card-wrapper'>
                      <Card
                        card={card}
                        onCardClick={handleClick}
                        classes={cardIds.includes(card.id) ? 'red-border' : ''}
                      >
                        <PropertyCard card={card as IPropertyCard} />
                      </Card>
                    </div>
                  );
                case 'PropertyWildcard':
                  return (
                    <div key={card.id} className='card-wrapper'>
                      <Card
                        card={card}
                        onCardClick={handleClick}
                        classes={cardIds.includes(card.id) ? 'red-border' : ''}
                      >
                        <PropertyWildcard card={card as IPropertyWildcard} />
                      </Card>
                    </div>
                  );
                default:
                  return 'Uh oh!';
              }
            })}
          </React.Fragment>
        ))}
      </div>
      <div className='modal--card__button-container'>
        <JustSayNoButton
          setIsJustSayNoPendingModalHidden={setIsJustSayNoPendingModalHidden}
          socket={socket}
          hand={hand}
        />
        <button
          onClick={() =>
            socket.emit(SocketEvent.FROM_CLIENT_TARGET_RESPONSE_DEBT_COLLECTOR, {
              cardIds: cardIds
            })
          }
          className='modal--card__button button--play'
          type='button'
        >
          GIVE $5
        </button>
      </div>
    </div>
  );
};

export default TargetQuestionDebtCollectorModal;
