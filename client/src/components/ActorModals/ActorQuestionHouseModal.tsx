import React, { useState } from 'react';
import {
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard
} from '../GameScreen/interfaces';
import ActionCard from '../Card/ActionCard';
import SocketEvent from '../../helpers/SocketEvent';

interface IProps {
  socket: SocketIOClient.Socket;
  cardId: number;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
  fullSets: number[];
}

const ActorQuestionHouseModal: React.FC<IProps> = ({ socket, cardId, hand, fullSets }) => {
  const [selectedSet, setSelectedSet] = useState<number>(fullSets[0]);

  function renderSetName(set: number) {
    switch (set) {
      case 0:
        return 'Brown';
      case 1:
        return 'Light Blue';
      case 2:
        return 'Pink';
      case 3:
        return 'Orange';
      case 4:
        return 'Red';
      case 5:
        return 'Yellow';
      case 6:
        return 'Green';
      case 7:
        return 'Blue';
      case 8:
        return 'Station';
      case 9:
        return 'Utility';
      default:
        return 'Uh oh!';
    }
  }

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>Action in play</h3>
      <h2 className='action-modal__title'>House</h2>
      <div className='action-modal__staged-cards'>
        <div className='card-wrapper'>
          <div className='card'>
            <ActionCard card={hand.filter((c) => c.id === cardId)[0] as IActionCard} />
          </div>
        </div>
      </div>
      <div className='modal--card__button-container button-container--choose-set'>
        <select
          onChange={(event) => setSelectedSet(parseInt(event.target.value))}
          value={selectedSet}
        >
          {fullSets.map((set) => (
            <option key={set} value={set}>
              {renderSetName(set)}
            </option>
          ))}
        </select>
      </div>
      <div className='modal--card__button-container'>
        <button
          onClick={() =>
            socket.emit(SocketEvent.FROM_CLIENT_ACTOR_RESPONSE_HOUSE, { selectedSet: selectedSet })
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

export default ActorQuestionHouseModal;
