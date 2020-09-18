import _ from 'lodash';
import React, { useState, SetStateAction, Dispatch } from 'react';
import {
  IPropertySet,
  IPropertyCard,
  IPropertyWildcard,
  IPlayer,
  ICard
} from '../GameScreen/interfaces';
import { getType } from '../GameScreen/helpers';
import Card from '../Card';
import PropertyCard from '../Card/PropertyCard';
import PropertyWildcard from '../Card/PropertyWildcard';
import SocketEvent from '../../helpers/SocketEvent';
import PropertyWildcardHidden from '../Card/PropertyWildcardHidden';

interface IProps {
  setIsActorQuestionForcedDealModalBHidden: Dispatch<SetStateAction<any>>;
  socket: SocketIOClient.Socket;
  properties: IPropertySet[];
  targetPlayer: string;
  players: IPlayer[];
}

const ActorQuestionForcedDealModalB: React.FC<IProps> = ({
  setIsActorQuestionForcedDealModalBHidden,
  socket,
  properties,
  targetPlayer,
  players
}) => {
  const [actorCardIdToSwap, setActorCardIdToSwap] = useState<number>();
  const [targetCardIdToSwap, setTargetCardIdToSwap] = useState<number>();

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>Action in play</h3>
      <h2 className='action-modal__title'>Forced Deal</h2>
      <div className='properties'>
        {properties
          .filter((p) => p.cards.length < p.size)
          .map((property) =>
            property.cards.map((card) => {
              switch (getType(card)) {
                case 'PropertyCard':
                  return (
                    <div key={card.id} className='card-wrapper'>
                      <Card
                        card={card}
                        onCardClick={() => setActorCardIdToSwap(card.id)}
                        classes={actorCardIdToSwap === card.id ? 'red-border' : ''}
                      >
                        <PropertyCard card={card as IPropertyCard} />
                      </Card>
                    </div>
                  );
                case 'PropertyWildcard':
                  return (
                    <div key={card.id} className='card-wrapper'>
                      <Card
                        card={card}
                        onCardClick={() => setActorCardIdToSwap(card.id)}
                        classes={actorCardIdToSwap === card.id ? 'red-border' : ''}
                      >
                        <PropertyWildcard card={card as IPropertyWildcard} />
                      </Card>
                    </div>
                  );
                default:
                  return 'Uh oh!';
              }
            })
          )}
      </div>
      <div className='properties'>
        {players
          .filter((p: any) => p.name === targetPlayer)[0]
          .properties.filter((p: any) => p.cards.length < p.size)
          .map((property: any) =>
            property.cards.map((card: any) => {
              switch (getType(card)) {
                case 'PropertyCard':
                  return (
                    <div key={card.id} className='card-wrapper'>
                      <Card
                        card={card}
                        onCardClick={() => setTargetCardIdToSwap(card.id)}
                        classes={targetCardIdToSwap === card.id ? 'green-border' : ''}
                      >
                        <PropertyCard card={card as IPropertyCard} />
                      </Card>
                    </div>
                  );
                case 'PropertyWildcard':
                  if (card.id < 38) {
                    return (
                      <div key={card.id} className='card-wrapper'>
                        <Card
                          card={card}
                          onCardClick={() => setTargetCardIdToSwap(card.id)}
                          classes={targetCardIdToSwap === card.id ? 'green-border' : ''}
                        >
                          <PropertyWildcardHidden
                            card={card as IPropertyWildcard}
                            isRotated={card.setTwo === property.set}
                          />
                        </Card>
                      </div>
                    );
                  }

                  return (
                    <div key={card.id} className='card-wrapper'>
                      <Card
                        card={card}
                        onCardClick={() => setTargetCardIdToSwap(card.id)}
                        classes={targetCardIdToSwap === card.id ? 'green-border' : ''}
                      >
                        <PropertyWildcard card={card as IPropertyWildcard} />
                      </Card>
                    </div>
                  );
                default:
                  return 'Uh oh!';
              }
            })
          )}
      </div>
      <div className='modal--card__button-container'>
        <button
          onClick={() => setIsActorQuestionForcedDealModalBHidden(undefined)}
          className='modal--card__button button--rotate'
          type='button'
        >
          Back
        </button>
        <button
          onClick={() =>
            socket.emit(SocketEvent.FROM_CLIENT_ACTOR_RESPONSE_FORCED_DEAL, {
              targetPlayerName: targetPlayer,
              actorCardIdToSwap: actorCardIdToSwap,
              targetCardIdToSwap: targetCardIdToSwap
            })
          }
          className='modal--card__button button--play'
          type='button'
          disabled={actorCardIdToSwap === undefined || targetCardIdToSwap === undefined}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default ActorQuestionForcedDealModalB;
