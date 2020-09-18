import React from 'react';
import { IMoneyCard } from '../GameScreen/interfaces';
import MoneyCard from '../Card/MoneyCard';
import SocketEvent from '../../helpers/SocketEvent';
import ModalCardSummaryCancelButton from './ModalCardSummaryCancelButton';

interface IProps {
  onUnselectCard: () => void;
  socket: SocketIOClient.Socket;
  card: IMoneyCard;
  isCurrentPlayer: boolean;
}

const ModalCardSummaryMoney: React.FC<IProps> = ({
  onUnselectCard,
  socket,
  card,
  isCurrentPlayer
}) => {
  return (
    <React.Fragment>
      <div className='card'>
        <MoneyCard card={card as IMoneyCard} />
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
      </div>
      <ModalCardSummaryCancelButton onUnselectCard={onUnselectCard} />
    </React.Fragment>
  );
};

export default ModalCardSummaryMoney;
