import React from 'react';
import { IPropertyCard } from '../GameScreen/interfaces';
import SocketEvent from '../../helpers/SocketEvent';
import ModalCardSummaryCancelButton from './ModalCardSummaryCancelButton';
import PropertyCard from '../Card/PropertyCard';

interface IProps {
  onUnselectCard: () => void;
  socket: SocketIOClient.Socket;
  card: IPropertyCard;
  isCurrentPlayer: boolean;
}

const ModalCardSummaryProperty: React.FC<IProps> = ({
  onUnselectCard,
  socket,
  card,
  isCurrentPlayer
}) => {
  return (
    <React.Fragment>
      <div className='card'>
        <PropertyCard card={card as IPropertyCard} />
      </div>
      <div className='modal--card__button-container'>
        <button
          onClick={() => {
            socket?.emit(SocketEvent.FROM_CLIENT_PLAY_PROPERTY, { cardId: card.id });
            onUnselectCard();
          }}
          className='modal--card__button button--property'
          type='button'
          disabled={!isCurrentPlayer}
        >
          Add to Properties
        </button>
      </div>
      <ModalCardSummaryCancelButton onUnselectCard={onUnselectCard} />
    </React.Fragment>
  );
};

export default ModalCardSummaryProperty;
