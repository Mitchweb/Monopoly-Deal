import React from 'react';
import { IRentCard, IGameState } from '../GameScreen/interfaces';
import SocketEvent from '../../helpers/SocketEvent';
import ModalCardSummaryCancelButton from './ModalCardSummaryCancelButton';
import RentCard from '../Card/RentCard';

interface IProps {
  onUnselectCard: () => void;
  socket: SocketIOClient.Socket;
  card: IRentCard;
  isCurrentPlayer: boolean;
  gameState: IGameState;
}

const ModalCardSummaryRent: React.FC<IProps> = ({
  onUnselectCard,
  socket,
  card,
  isCurrentPlayer,
  gameState
}) => {
  function isRentInvalid() {
    if (card.id < 60 || card.id > 69) {
      return false;
    }

    const properties = gameState.players.filter((p) => p.name === gameState.currentPlayer)[0]
      .properties;

    if (card.id >= 60 && card.id <= 61) {
      return properties[0].cards.length === 0 && properties[1].cards.length === 0;
    }

    if (card.id >= 62 && card.id <= 63) {
      return properties[2].cards.length === 0 && properties[3].cards.length === 0;
    }

    if (card.id >= 64 && card.id <= 65) {
      return properties[4].cards.length === 0 && properties[5].cards.length === 0;
    }

    if (card.id >= 66 && card.id <= 67) {
      return properties[6].cards.length === 0 && properties[7].cards.length === 0;
    }

    if (card.id >= 68 && card.id <= 69) {
      return properties[8].cards.length === 0 && properties[9].cards.length === 0;
    }
  }

  return (
    <React.Fragment>
      <div className='card'>
        <RentCard card={card as IRentCard} />
      </div>
      <div className='modal--card__button-container'>
        <button
          onClick={() => {
            socket?.emit(SocketEvent.FROM_CLIENT_PLAY_MONEY, { cardId: card.id });
            onUnselectCard();
          }}
          className='modal--card__button button--money'
          type='button'
          disabled={!isCurrentPlayer}
        >
          Add to Money
        </button>
        <button
          onClick={() => {
            socket?.emit(SocketEvent.FROM_CLIENT_PLAY_ACTION, { cardId: card.id });
            onUnselectCard();
          }}
          className='modal--card__button button--play'
          type='button'
          disabled={!isCurrentPlayer || isRentInvalid()}
        >
          Play
        </button>
      </div>
      <ModalCardSummaryCancelButton onUnselectCard={onUnselectCard} />
    </React.Fragment>
  );
};

export default ModalCardSummaryRent;
