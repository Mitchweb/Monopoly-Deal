import React, { Dispatch, SetStateAction } from 'react';
import {
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard,
  IPropertySet
} from '../GameScreen/interfaces';
import SocketEvent from '../../helpers/SocketEvent';
import JustSayNoButton from './JustSayNoButton';
import PropertySetCard from '../Card/PropertySetCard';

interface IProps {
  setIsJustSayNoPendingModalHidden: Dispatch<SetStateAction<boolean>>;
  socket: SocketIOClient.Socket;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
  properties: IPropertySet[];
  targetSet: number;
}

const TargetQuestionDealBreakerModal: React.FC<IProps> = ({
  setIsJustSayNoPendingModalHidden,
  socket,
  hand,
  properties,
  targetSet
}) => {
  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>You are the target of</h3>
      <h2 className='action-modal__title'>Deal Breaker</h2>
      <div className='action-modal__staged-cards'>
        <div className='card-wrapper'>
          <div className='card'>
            <PropertySetCard set={targetSet} />
          </div>
          <p className='staged-cards__label-lose'>Lose</p>
        </div>
      </div>
      <div className='modal--card__button-container'>
        <JustSayNoButton
          setIsJustSayNoPendingModalHidden={setIsJustSayNoPendingModalHidden}
          socket={socket}
          hand={hand}
        />
        <button
          onClick={() => socket.emit(SocketEvent.FROM_CLIENT_TARGET_RESPONSE_DEAL_BREAKER)}
          className='modal--card__button button--play'
          type='button'
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default TargetQuestionDealBreakerModal;
