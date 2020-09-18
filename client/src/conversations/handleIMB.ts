import { Dispatch, SetStateAction } from 'react';
import SocketEvent from '../helpers/SocketEvent';

export function handleConversationIMB(
  socket: SocketIOClient.Socket,
  hideAllModals: () => void,
  setIsTargetQuestionIMBModalHidden: Dispatch<SetStateAction<boolean>>
) {
  socket.on(SocketEvent.FROM_SERVER_TARGET_QUESTION_IMB, () => {
    hideAllModals();
    setIsTargetQuestionIMBModalHidden(false);
  });
}
