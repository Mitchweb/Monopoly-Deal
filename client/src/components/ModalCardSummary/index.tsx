import React from 'react';
import {
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard,
  IGameState
} from '../GameScreen/interfaces';
import { getType } from '../GameScreen/helpers';
import ModalCardSummaryMoney from './ModalCardSummaryMoney';
import ModalCardSummaryProperty from './ModalCardSummaryProperty';
import ModalCardSummaryPropertyWildcard from './ModalCardSummaryPropertyWildcard';
import ModalCardSummaryRent from './ModalCardSummaryRent';
import ModalCardSummaryAction from './ModalCardSummaryAction';

interface IProps {
  onUnselectCard: () => void;
  socket: SocketIOClient.Socket;
  card: IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard;
  isCurrentPlayer: boolean;
  gameState: IGameState;
}

const ModalCardSummary: React.FC<IProps> = ({ onUnselectCard, socket, card, isCurrentPlayer, gameState }) => {
  function renderCard() {
    switch (getType(card)) {
      case 'PropertyCard':
        return (
          <ModalCardSummaryProperty
            onUnselectCard={onUnselectCard}
            socket={socket}
            card={card as IPropertyCard}
            isCurrentPlayer={isCurrentPlayer}
          />
        );
      case 'PropertyWildcard':
        return (
          <ModalCardSummaryPropertyWildcard
            onUnselectCard={onUnselectCard}
            socket={socket}
            card={card as IPropertyWildcard}
            isCurrentPlayer={isCurrentPlayer}
          />
        );
      case 'MoneyCard':
        return (
          <ModalCardSummaryMoney
            onUnselectCard={onUnselectCard}
            socket={socket}
            card={card as IMoneyCard}
            isCurrentPlayer={isCurrentPlayer}
          />
        );
      case 'RentCard':
        return (
          <ModalCardSummaryRent
            onUnselectCard={onUnselectCard}
            socket={socket}
            card={card as IRentCard}
            isCurrentPlayer={isCurrentPlayer}
            gameState={gameState}
          />
        );
      case 'ActionCard':
        return (
          <ModalCardSummaryAction
            onUnselectCard={onUnselectCard}
            socket={socket}
            card={card as IActionCard}
            isCurrentPlayer={isCurrentPlayer}
            gameState={gameState}
          />
        );
      default:
        return 'Uh oh!';
    }
  }

  return <div className='modal modal--card'>{renderCard()}</div>;
};

export default ModalCardSummary;
