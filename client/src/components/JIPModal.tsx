import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import SocketEvent from '../helpers/SocketEvent';

interface IProps {
  setIsJIPModalHidden: Dispatch<SetStateAction<any>>;
  setPlayerName: Dispatch<SetStateAction<string>>;
  socket: SocketIOClient.Socket;
  disconnectedPlayers: string[];
}

const JIPModal: React.FC<IProps> = ({
  setIsJIPModalHidden,
  setPlayerName,
  socket,
  disconnectedPlayers
}) => {
  const [selectedPlayerName, setSelectedPlayerName] = useState<string>(disconnectedPlayers[0]);

  useEffect(() => {
    setPlayerName(disconnectedPlayers[0]);
  }, [disconnectedPlayers]);

  return (
    <div className='jip-modal'>
      <h3>JOIN IN PROGRESS</h3>
      <h2>Select player to join as</h2>
      <select
        onChange={(event) => {
          setSelectedPlayerName(event.target.value);
          setPlayerName(event.target.value);
        }}
        value={selectedPlayerName}
      >
        {disconnectedPlayers.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          socket.emit(SocketEvent.FROM_CLIENT_CONFIRM_JOIN_IN_PROGRESS, {
            selectedPlayerName: selectedPlayerName
          });
          setIsJIPModalHidden(undefined);
        }}
        type='button'
      >
        Join as {selectedPlayerName}
      </button>
    </div>
  );
};

export default JIPModal;
