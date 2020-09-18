import React from 'react';

interface IProps {
  disconnectedPlayers: string[];
}

const GamePausedModal: React.FC<IProps> = ({ disconnectedPlayers }) => {
  return (
    <div className='pause-modal'>
      <h1>GAME PAUSED</h1>
      <div>
        <h2>Waiting for players to reconnect...</h2>
        {disconnectedPlayers.map((p) => (
          <h3 key={p}>{p}</h3>
        ))}
      </div>
    </div>
  );
};

export default GamePausedModal;
