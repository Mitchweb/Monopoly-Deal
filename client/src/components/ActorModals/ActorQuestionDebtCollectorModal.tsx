import React, { useState } from 'react';
import {
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard,
  IPlayer
} from '../GameScreen/interfaces';
import SocketEvent from '../../helpers/SocketEvent';
import ActionCard from '../Card/ActionCard';

interface IProps {
  socket: SocketIOClient.Socket;
  cardId: number;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
  playerName: string;
  players: IPlayer[];
}

const ActorQuestionDebtCollectorModal: React.FC<IProps> = ({
  socket,
  cardId,
  hand,
  playerName,
  players
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>(
    players.filter((p) => p.name !== playerName)[0].name
  );

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>Action in play</h3>
      <h2 className='action-modal__title'>Debt Collector</h2>
      <div className='action-modal__staged-cards'>
        <div className='card-wrapper'>
          <div className='card'>
            <ActionCard card={hand.filter((c) => c.id === cardId)[0] as IActionCard} />
          </div>
        </div>
      </div>
      <div className='modal--card__button-container button-container--choose-set'>
        <select onChange={(event) => setSelectedPlayer(event.target.value)} value={selectedPlayer}>
          {players
            .filter((p) => p.name !== playerName)
            .map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
        </select>
      </div>
      <div className='modal--card__button-container'>
        <button
          onClick={() =>
            socket.emit(SocketEvent.FROM_CLIENT_ACTOR_RESPONSE_DEBT_COLLECTOR, {
              selectedPlayer: selectedPlayer
            })
          }
          className='modal--card__button button--play'
          type='button'
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default ActorQuestionDebtCollectorModal;
