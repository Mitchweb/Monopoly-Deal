import React, { useState } from 'react';

import {
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard,
  IGameState,
  IPropertySet
} from './interfaces';
import CardTray from './CardTray';
import ModalCardSummary from '../ModalCardSummary';
import PlayerInfo from './PlayerInfo';
import TopBar from './TopBar';
import ModalWildcards from './ModalWildcards';
import PropertyCard from '../Card/PropertyCard';

interface IProps {
  socket: SocketIOClient.Socket;
  gameState: IGameState;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
  money: IMoneyCard[];
  actionsLeft: number;
  playerName: string;
  properties: IPropertySet[];
}

const GameScreen: React.FC<IProps> = ({
  socket,
  gameState,
  hand,
  money,
  actionsLeft,
  playerName,
  properties
}) => {
  const [isShowingHand, setIsShowingHand] = useState<boolean>(true);
  const [selectedCard, setSelectedCard] = useState<
    IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard | undefined
  >(undefined);

  const handleToggleHandMoney = () => {
    setIsShowingHand(!isShowingHand);
  };

  const handleCardClick = (
    card: IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard
  ) => {
    setSelectedCard(card);
  };

  const handleUnselectCard = () => {
    setSelectedCard(undefined);
  };

  return (
    <div className='game-screen'>
      <TopBar
        socket={socket}
        actionsLeft={actionsLeft}
        deckCount={gameState.deckCount}
        isCurrentPlayer={gameState.currentPlayer === playerName}
        turn={gameState.turn}
      />
      <PlayerInfo players={gameState.players} currentPlayer={gameState.currentPlayer} />
      {selectedCard && (
        <ModalCardSummary
          onUnselectCard={handleUnselectCard}
          socket={socket}
          card={selectedCard}
          isCurrentPlayer={gameState.currentPlayer === playerName}
          gameState={gameState}
        />
      )}
      <CardTray
        socket={socket}
        onToggleHandMoney={handleToggleHandMoney}
        onCardClick={handleCardClick}
        isShowingHand={isShowingHand}
        hand={hand}
        money={money}
        properties={properties}
        isCurrentPlayer={gameState.currentPlayer === playerName}
      />
    </div>
  );
};

export default GameScreen;
