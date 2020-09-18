import React, { useState } from 'react';
import {
  IPropertySet,
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard
} from '../GameScreen/interfaces';
import RentCard from '../Card/RentCard';
import SocketEvent from '../../helpers/SocketEvent';

interface IProps {
  socket: SocketIOClient.Socket;
  cardId: number;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
  properties: IPropertySet[];
  actionsLeft: number;
}

const ActorQuestionRentModal: React.FC<IProps> = ({
  socket,
  cardId,
  hand,
  properties,
  actionsLeft
}) => {
  const [selectedSet, setSelectedSet] = useState<number>(initSelectedSet());
  const [doubleIdOne, setDoubleIdOne] = useState<number>();
  const [doubleIdTwo, setDoubleIdTwo] = useState<number>();

  function initSelectedSet() {
    switch (cardId) {
      case 60:
      case 61:
        if (properties[0].cards.length !== 0) {
          return 0;
        }
        return 1;
      case 62:
      case 63:
        if (properties[2].cards.length !== 0) {
          return 2;
        }
        return 3;
      case 64:
      case 65:
        if (properties[4].cards.length !== 0) {
          return 4;
        }
        return 5;
      case 66:
      case 67:
        if (properties[6].cards.length !== 0) {
          return 6;
        }
        return 7;
      case 68:
      case 69:
        if (properties[8].cards.length !== 0) {
          return 8;
        }
        return 9;
      default:
        return 0;
    }
  }

  function getRent(set: number) {
    const rentIndex = properties[set].cards.length - 1;
    return properties[set].rent[rentIndex];
  }

  function renderOptions() {
    switch (cardId) {
      case 60:
      case 61:
        return (
          <React.Fragment>
            {properties[0].cards.length !== 0 && <option value='0'>Brown (${getRent(0)})</option>}
            {properties[1].cards.length !== 0 && (
              <option value='1'>Light Blue (${getRent(1)})</option>
            )}
          </React.Fragment>
        );
      case 62:
      case 63:
        return (
          <React.Fragment>
            {properties[2].cards.length !== 0 && <option value='2'>Pink (${getRent(2)})</option>}
            {properties[3].cards.length !== 0 && <option value='3'>Orange (${getRent(3)})</option>}
          </React.Fragment>
        );
      case 64:
      case 65:
        return (
          <React.Fragment>
            {properties[4].cards.length !== 0 && <option value='4'>Red (${getRent(4)})</option>}
            {properties[5].cards.length !== 0 && <option value='5'>Yellow (${getRent(5)})</option>}
          </React.Fragment>
        );
      case 66:
      case 67:
        return (
          <React.Fragment>
            {properties[6].cards.length !== 0 && <option value='6'>Green (${getRent(6)})</option>}
            {properties[7].cards.length !== 0 && <option value='7'>Blue (${getRent(7)})</option>}
          </React.Fragment>
        );
      case 68:
      case 69:
        return (
          <React.Fragment>
            {properties[8].cards.length !== 0 && (
              <option value='8'>Station (${getRent(8)})</option>
            )}
            {properties[9].cards.length !== 0 && (
              <option value='9'>Utility (${getRent(9)})</option>
            )}
          </React.Fragment>
        );
    }
  }

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>Action in play</h3>
      <h2 className='action-modal__title'>Rent</h2>
      <div className='action-modal__staged-cards'>
        <div className='card-wrapper'>
          <div className='card'>
            <RentCard card={hand.filter((c) => c.id === cardId)[0] as IRentCard} />
          </div>
        </div>
      </div>
      <div className='modal--card__button-container button-container--double-rent'>
        <button
          onClick={() => {
            if (doubleIdOne !== undefined) {
              setDoubleIdOne(undefined);
            } else {
              setDoubleIdOne(hand.filter((c) => c.id >= 83 && c.id <= 84)[0].id);
            }
          }}
          className={`modal--card__button button--rotate ${
            doubleIdOne !== undefined ? 'button--rotate--highlighted' : ''
          }`}
          disabled={hand.filter((c) => c.id >= 83 && c.id <= 84).length === 0 || actionsLeft < 2}
        >
          Double Rent?
        </button>
        <button
          onClick={() => {
            if (doubleIdTwo !== undefined) {
              setDoubleIdTwo(undefined);
            } else {
              setDoubleIdTwo(hand.filter((c) => c.id >= 83 && c.id <= 84)[1].id);
            }
          }}
          className={`modal--card__button button--rotate ${
            doubleIdTwo !== undefined ? 'button--rotate--highlighted' : ''
          }`}
          disabled={hand.filter((c) => c.id >= 83 && c.id <= 84).length !== 2 || actionsLeft < 3}
        >
          Double Rent?
        </button>
      </div>
      <div className='modal--card__button-container button-container--choose-set'>
        <select
          onChange={(event) => setSelectedSet(parseInt(event.target.value))}
          value={selectedSet}
        >
          {renderOptions()}
        </select>
      </div>
      <div className='modal--card__button-container'>
        <button
          onClick={() =>
            socket.emit(SocketEvent.FROM_CLIENT_ACTOR_RESPONSE_RENT, {
              selectedSet: selectedSet,
              doubleIdOne: doubleIdOne,
              doubleIdTwo: doubleIdTwo
            })
          }
          className='modal--card__button button--play'
          type='button'
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default ActorQuestionRentModal;
