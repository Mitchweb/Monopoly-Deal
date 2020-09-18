import React, { Dispatch, SetStateAction } from 'react';
import {
  IPropertyCard,
  IActionCard,
  IRentCard,
  IPropertyWildcard,
  IMoneyCard
} from '../GameScreen/interfaces';
import SocketEvent from '../../helpers/SocketEvent';

interface IProps {
  setIsJustSayNoPendingModalHidden: Dispatch<SetStateAction<boolean>>;
  socket: SocketIOClient.Socket;
  hand: (IActionCard | IRentCard | IPropertyCard | IPropertyWildcard | IMoneyCard)[];
}

const JustSayNoButton: React.FC<IProps> = ({ setIsJustSayNoPendingModalHidden, socket, hand }) => {
  return (
    <button
      onClick={() => {
        socket?.emit(SocketEvent.FROM_CLIENT_TARGET_RESPONSE_JUST_SAY_NO, {
          cardId: hand.filter((c) => c.id >= 102 && c.id <= 104)[0].id
        });
        setIsJustSayNoPendingModalHidden(false);
      }}
      className='modal--card__button button--money'
      type='button'
      disabled={hand.filter((c) => c.id >= 102 && c.id <= 104).length === 0}
    >
      JUST SAY NO!
    </button>
  );
};

export default JustSayNoButton;
