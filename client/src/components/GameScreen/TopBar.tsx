import React from 'react';
import SocketEvent from '../../helpers/SocketEvent';

interface IProps {
  socket: SocketIOClient.Socket;
  actionsLeft: number;
  deckCount: number;
  isCurrentPlayer: boolean;
  turn: number;
}

const TopBar: React.FC<IProps> = ({ socket, actionsLeft, deckCount, isCurrentPlayer, turn }) => {
  return (
    <div className='top-bar'>
      <span>Turn {turn}</span>
      <div className='top-bar__deck'>
        <div className='top-bar__deck-icon'></div>
        <div>
          <span>{deckCount}</span>
        </div>
      </div>
      <button
        onClick={() => socket.emit(SocketEvent.FROM_CLIENT_END_TURN)}
        className={`top-bar__end-turn ${actionsLeft <= 0 ? 'end-turn--highlighted' : ''}`}
        type='button'
        disabled={!isCurrentPlayer}
      >
        End Turn
      </button>
    </div>
  );
};

export default TopBar;
