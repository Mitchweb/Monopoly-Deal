import React, { useState } from 'react';
import {
  IMoneyCard,
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IPropertySet
} from './interfaces';
import Hand from './Hand';
import Money from './Money';
import ModalWildcards from './ModalWildcards';

interface IProps {
  socket: SocketIOClient.Socket;
  onToggleHandMoney: () => void;
  onCardClick: (
    card: IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard
  ) => void;
  isShowingHand: boolean;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
  money: IMoneyCard[];
  properties: IPropertySet[];
  isCurrentPlayer: boolean;
}

const CardTray: React.FC<IProps> = ({
  socket,
  onToggleHandMoney,
  onCardClick,
  isShowingHand,
  hand,
  money,
  properties,
  isCurrentPlayer
}) => {
  const [isModalWildcardsHidden, setIsModalWildcardsHidden] = useState<boolean>(true);

  return (
    <div className='card-tray'>
      <button
        onClick={() => setIsModalWildcardsHidden(!isModalWildcardsHidden)}
        className='modal-wildcards-button'
        type='button'
        disabled={!isCurrentPlayer}
      >
        Swap Wild Cards
      </button>
      <div className='hand-money-block'>
        {isShowingHand ? (
          <span className='hand-money-message'>
            Viewing{' '}
            <span className={`text--big ${hand.length >= 7 ? 'text--red' : ''}`}>
              {hand.length}
            </span>{' '}
            cards in your hand
          </span>
        ) : (
          <span className='hand-money-message'>
            Viewing <span className='text--big'>{money.length}</span> cards in your money pile
          </span>
        )}
        <button onClick={() => onToggleHandMoney()} className='hand-money-button' type='button'>
          Toggle
        </button>
      </div>
      {isShowingHand ? <Hand onCardClick={onCardClick} hand={hand} /> : <Money money={money} />}
      {isCurrentPlayer && !isModalWildcardsHidden && (
        <ModalWildcards
          setIsModalWildcardsHidden={setIsModalWildcardsHidden}
          socket={socket}
          properties={properties}
        />
      )}
    </div>
  );
};

export default CardTray;
