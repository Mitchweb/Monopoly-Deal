import React from 'react';
import { IActionCard, IGameState } from '../GameScreen/interfaces';
import SocketEvent from '../../helpers/SocketEvent';
import ModalCardSummaryCancelButton from './ModalCardSummaryCancelButton';
import ActionCard from '../Card/ActionCard';

interface IProps {
  onUnselectCard: () => void;
  socket: SocketIOClient.Socket;
  card: IActionCard;
  isCurrentPlayer: boolean;
  gameState: IGameState;
}

const ModalCardSummaryAction: React.FC<IProps> = ({
  onUnselectCard,
  socket,
  card,
  isCurrentPlayer,
  gameState
}) => {
  function isForcedSlyDealInvalid() {
    if (card.id < 91 || card.id > 96) {
      // Not Forced Deal or Sly Deal.
      return false;
    }

    let isTargetInvalid = true;

    if (card.id >= 91 && card.id <= 96) {
      // Forced Deal and Sly Deal
      const playersArray = gameState.players.filter((p) => p.name !== gameState.currentPlayer);

      for (let player of playersArray) {
        for (let propertySet of player.properties) {
          if (propertySet.cards.length > 0) {
            isTargetInvalid = false;
          }
        }
      }
    }

    if (card.id >= 94 && card.id <= 96) {
      // We have a Sly Deal, and enough info to see if it's invalid.
      return isTargetInvalid;
    }

    // Otherwise, move onto Forced Deal.

    let isActorInvalid = true;

    if (card.id >= 91 && card.id <= 93) {
      // Forced Deal.
      const properties = gameState.players.filter((p) => p.name === gameState.currentPlayer)[0]
        .properties;

      for (let propertySet of properties) {
        if (propertySet.cards.length > 0) {
          isActorInvalid = false;
        }
      }
    }

    return isActorInvalid || isTargetInvalid;
  }

  function isHouseInvalid() {
    if (card.id < 97 || card.id > 99) {
      return false;
    }

    const properties = gameState.players.filter((p) => p.name === gameState.currentPlayer)[0]
      .properties;

    for (let propertySet of properties) {
      if (propertySet.cards.length >= propertySet.size) {
        return false;
      }
    }

    return true;
  }

  function isHotelInvalid() {
    if (card.id < 100 || card.id > 101) {
      return false;
    }

    const properties = gameState.players.filter((p) => p.name === gameState.currentPlayer)[0]
      .properties;

    for (let propertySet of properties) {
      if (propertySet.cards.length >= propertySet.size && propertySet.hasHouse) {
        return false;
      }
    }

    return true;
  }

  return (
    <React.Fragment>
      <div className='card'>
        <ActionCard card={card as IActionCard} />
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
          disabled={
            !isCurrentPlayer ||
            (card.id >= 83 && card.id <= 84) ||
            isForcedSlyDealInvalid() ||
            isHouseInvalid() ||
            isHotelInvalid() ||
            (card.id >= 102 && card.id <= 104)
          }
        >
          Play
        </button>
      </div>
      <ModalCardSummaryCancelButton onUnselectCard={onUnselectCard} />
    </React.Fragment>
  );
};

export default ModalCardSummaryAction;
