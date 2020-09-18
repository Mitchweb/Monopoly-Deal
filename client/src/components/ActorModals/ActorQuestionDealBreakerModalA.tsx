import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard
} from '../GameScreen/interfaces';
import ActionCard from '../Card/ActionCard';

interface IProps {
  setIsActorQuestionDealBreakerModalBHidden: Dispatch<SetStateAction<any>>;
  cardId: number;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
  validPlayers: string[];
}

const ActorQuestionDealBreakerModalA: React.FC<IProps> = ({
  setIsActorQuestionDealBreakerModalBHidden,
  cardId,
  hand,
  validPlayers
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>(validPlayers[0]);

  console.log(selectedPlayer);

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>Action in play</h3>
      <h2 className='action-modal__title'>Deal Breaker</h2>
      <div className='action-modal__staged-cards'>
        <div className='card-wrapper'>
          <div className='card'>
            <ActionCard card={hand.filter((c) => c.id === cardId)[0] as IActionCard} />
          </div>
        </div>
      </div>
      <div className='modal--card__button-container button-container--choose-set'>
        <select onChange={(event) => setSelectedPlayer(event.target.value)} value={selectedPlayer}>
          {validPlayers.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className='modal--card__button-container'>
        <button
          onClick={() =>
            setIsActorQuestionDealBreakerModalBHidden({
              targetPlayerName: selectedPlayer
            })
          }
          className='modal--card__button button--play'
          type='button'
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default ActorQuestionDealBreakerModalA;
