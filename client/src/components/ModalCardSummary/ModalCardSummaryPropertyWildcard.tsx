import React, { useState } from 'react';
import { IPropertyWildcard } from '../GameScreen/interfaces';
import SocketEvent from '../../helpers/SocketEvent';
import ModalCardSummaryCancelButton from './ModalCardSummaryCancelButton';
import PropertyWildcard from '../Card/PropertyWildcard';

interface IProps {
  onUnselectCard: () => void;
  socket: SocketIOClient.Socket;
  card: IPropertyWildcard;
  isCurrentPlayer: boolean;
}

const ModalCardSummaryPropertyWildcard: React.FC<IProps> = ({
  onUnselectCard,
  socket,
  card,
  isCurrentPlayer
}) => {
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const [selectedSet, setSelectedSet] = useState<number>(0);

  return (
    <React.Fragment>
      <div className={`card ${isRotated ? 'card--rotated' : ''}`}>
        <PropertyWildcard card={card as IPropertyWildcard} />
      </div>
      <div className='modal--card__button-container'>
        <select
          onChange={(event) => setSelectedSet(parseInt(event.target.value))}
          value={selectedSet}
          disabled={card.id < 38 || !isCurrentPlayer}
        >
          <option value='0'>Brown</option>
          <option value='1'>Light Blue</option>
          <option value='2'>Pink</option>
          <option value='3'>Orange</option>
          <option value='4'>Red</option>
          <option value='5'>Yellow</option>
          <option value='6'>Green</option>
          <option value='7'>Blue</option>
          <option value='8'>Station</option>
          <option value='9'>Utility</option>
        </select>
        <button
          onClick={() => setIsRotated(!isRotated)}
          className='modal--card__button button--rotate'
          type='button'
          disabled={card.id > 37 || !isCurrentPlayer}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30' height='30px'>
            <path
              d='M21.9 7.6C20 5.8 17.6 4.8 15 4.8c-4.7 0-8.7 3.2-9.8 7.7-.1.3-.4.6-.7.6H1c-.5 0-.8-.4-.7-.9C1.6 5.3 7.7 0 15 0c4 0 7.7 1.6 10.4 4.2L27.5 2c.9-.9 2.5-.3 2.5 1v8.1c0 .8-.6 1.5-1.5 1.5h-8.1c-1.3 0-1.9-1.6-1-2.5l2.5-2.5zM1.5 17.4h8.1c1.3 0 1.9 1.6 1 2.5l-2.5 2.5c1.9 1.8 4.3 2.7 6.9 2.7 4.7 0 8.7-3.2 9.8-7.7.1-.3.4-.6.7-.6H29c.5 0 .8.4.7.9C28.4 24.7 22.3 30 15 30c-4 0-7.7-1.6-10.4-4.2L2.5 28c-.9.9-2.5.3-2.5-1v-8.1c0-.8.6-1.5 1.5-1.5z'
              fill='#fff'
            />
          </svg>
        </button>
        <button
          onClick={() => {
            socket?.emit(SocketEvent.FROM_CLIENT_PLAY_PROPERTY_WILDCARD_ALL, {
              cardId: card.id,
              selectedSet: selectedSet
            });
            onUnselectCard();
          }}
          className='modal--card__button button--property'
          type='button'
          disabled={card.id < 38 || !isCurrentPlayer}
        >
          Add
        </button>
        <button
          onClick={() => {
            socket?.emit(SocketEvent.FROM_CLIENT_PLAY_PROPERTY_WILDCARD, {
              cardId: card.id,
              isRotated: isRotated
            });
            onUnselectCard();
          }}
          className='modal--card__button button--property'
          type='button'
          disabled={card.id > 37 || !isCurrentPlayer}
        >
          Add to Properties
        </button>
      </div>
      <ModalCardSummaryCancelButton onUnselectCard={onUnselectCard} />
    </React.Fragment>
  );
};

export default ModalCardSummaryPropertyWildcard;
