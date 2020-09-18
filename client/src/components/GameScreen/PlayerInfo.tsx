import React from 'react';
import { IPropertyCard, IPlayer } from './interfaces';

interface IProps {
  players: IPlayer[];
  currentPlayer: string;
}

const PlayerInfo: React.FC<IProps> = ({ players, currentPlayer }) => {
  return (
    <div className='players'>
      {players.map((player, index) => (
        <div
          key={player.name}
          className={`player ${player.name === currentPlayer ? 'player--current' : ''}`}
        >
          <div className='player__stats'>
            <div className='player__stats__name'>{player.name}</div>
            <div className='player__stats__money'>
              <span className='stats__card'>M</span>
              <span className='stats__number'>{player.moneyCount}</span>
            </div>
            <div className='player__stats__hand'>
              <span className='stats__card'>H</span>
              <span className='stats__number'>{player.handCount}</span>
            </div>
          </div>
          <div className='player__properties'>
            {player.properties.map((set) => (
              <div key={set.set} className='player__properties__row'>
                <div>
                  {set.cards.map((card) => {
                    if (card.id === 38 || card.id === 39) {
                      return <div key={card.id} className={`row-mini-card set--all`}></div>;
                    }

                    let newCard = card as IPropertyCard;

                    return (
                      <div key={newCard.id} className={`row-mini-card set--${set.set}`}>
                        {newCard.set === undefined && <span>W</span>}
                      </div>
                    );
                  })}
                </div>
                <div
                  className={`row-house-hotel ${
                    set.hasHotel ? 'hotel' : set.hasHouse ? 'house' : ''
                  }`}
                >
                  <span>{set.hasHotel || set.hasHouse ? 'H' : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo;
