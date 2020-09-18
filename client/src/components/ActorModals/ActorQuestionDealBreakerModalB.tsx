import _ from 'lodash';
import React, { useState, SetStateAction, Dispatch } from 'react';
import { IPropertySet, IPropertyCard } from '../GameScreen/interfaces';
import Card from '../Card';
import SocketEvent from '../../helpers/SocketEvent';
import PropertySetCard from '../Card/PropertySetCard';

interface IProps {
  setIsActorQuestionDealBreakerModalBHidden: Dispatch<SetStateAction<any>>;
  socket: SocketIOClient.Socket;
  properties: IPropertySet[];
  targetPlayerName: string;
}

const ActorQuestionDealBreakerModalB: React.FC<IProps> = ({
  setIsActorQuestionDealBreakerModalBHidden,
  socket,
  properties,
  targetPlayerName
}) => {
  const [selectedSet, setSelectedSet] = useState<number>();

  console.log('properties', properties);
  console.log('targetPlayerName', targetPlayerName);

  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>Action in play</h3>
      <h2 className='action-modal__title'>Deal Breaker</h2>
      <div className='properties'>
        {properties
          .filter((p) => p.cards.length >= p.size)
          .map((p) => {
            return (
              <div key={p.set} className='card-wrapper'>
                <Card
                  card={p.cards[0] as IPropertyCard}
                  onCardClick={() => setSelectedSet(p.set)}
                  classes={selectedSet === p.set ? 'green-border' : ''}
                >
                  <PropertySetCard set={p.set} />
                </Card>
              </div>
            );
          })}
      </div>
      <div className='modal--card__button-container'>
        <button
          onClick={() => setIsActorQuestionDealBreakerModalBHidden(undefined)}
          className='modal--card__button button--rotate'
          type='button'
        >
          Back
        </button>
        <button
          onClick={() =>
            socket.emit(SocketEvent.FROM_CLIENT_ACTOR_RESPONSE_DEAL_BREAKER, {
              targetPlayerName: targetPlayerName,
              targetSet: selectedSet
            })
          }
          className='modal--card__button button--play'
          type='button'
          disabled={selectedSet === undefined}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default ActorQuestionDealBreakerModalB;
