import React, { Dispatch, SetStateAction } from 'react';
import {
  IActionCard,
  IRentCard,
  IPropertyCard,
  IPropertyWildcard,
  IMoneyCard
} from '../GameScreen/interfaces';
import SocketEvent from '../../helpers/SocketEvent';
import JustSayNoButton from './JustSayNoButton';

interface IProps {
  setIsJustSayNoPendingModalHidden: Dispatch<SetStateAction<boolean>>;
  socket: SocketIOClient.Socket;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
  playerName: string;
}

const TargetQuestionJustSayNoModal: React.FC<IProps> = ({
  setIsJustSayNoPendingModalHidden,
  socket,
  hand,
  playerName
}) => {
  return (
    <div className='action-modal'>
      <h3 className='action-modal__subtitle'>{playerName} played a</h3>
      <h2 className='action-modal__title'>Just Say No!</h2>
      <div className='modal--card__button-container'>
        <JustSayNoButton
          setIsJustSayNoPendingModalHidden={setIsJustSayNoPendingModalHidden}
          socket={socket}
          hand={hand}
        />
        <button
          onClick={() => socket.emit(SocketEvent.FROM_CLIENT_END_JUST_SAY_NO)}
          className='modal--card__button button--play'
          type='button'
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default TargetQuestionJustSayNoModal;
