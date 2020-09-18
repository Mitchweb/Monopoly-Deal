import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard,
  IPlayer
} from '../GameScreen/interfaces';
import ActionCard from '../Card/ActionCard';

interface IProps {
  setIsActorQuestionForcedDealModalBHidden: Dispatch<SetStateAction<any>>;
  socket: SocketIOClient.Socket;
  cardId: number;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
  playerName: string;
  players: IPlayer[];
}

const ActorQuestionForcedDealModalA: React.FC<IProps> = ({
  setIsActorQuestionForcedDealModalBHidden,
  cardId,
  hand,
  playerName,
  players
}) => {
  const [targetPlayer, setTargetPlayer] = useState<string>(
    players.filter((p) => p.name !== playerName)[0].name
  );

  function hasProperties(player: IPlayer) {
    let hasProperties = false;

    for (let propertySet of player.properties) {
      if (propertySet.cards.length > 0) {
        hasProperties = true;
      }
    }

    return hasProperties;
  }

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>Action in play</h3>
      <h2 className='action-modal__title'>Forced Deal</h2>
      <div className='action-modal__staged-cards'>
        <div className='card-wrapper'>
          <div className='card'>
            <ActionCard card={hand.filter((c) => c.id === cardId)[0] as IActionCard} />
          </div>
        </div>
      </div>
      <div className='modal--card__button-container button-container--choose-set'>
        <select onChange={(event) => setTargetPlayer(event.target.value)} value={targetPlayer}>
          {players
            .filter((p) => p.name !== playerName)
            .map((p) => {
              if (hasProperties(p)) {
                return (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                );
              }
            })}
        </select>
      </div>
      <div className='modal--card__button-container'>
        <button
          onClick={() =>
            setIsActorQuestionForcedDealModalBHidden({
              targetPlayer: targetPlayer,
              players: players
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

export default ActorQuestionForcedDealModalA;
