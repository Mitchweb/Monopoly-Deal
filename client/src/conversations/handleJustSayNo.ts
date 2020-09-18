import { Dispatch, SetStateAction } from 'react';
import SocketEvent from '../helpers/SocketEvent';

export function handleConversationJustSayNo(
  socket: SocketIOClient.Socket,
  hideAllModals: () => void,
  setIsTargetQuestionJustSayNoModalHidden: Dispatch<SetStateAction<string | undefined>>
) {
  socket.on(SocketEvent.FROM_SERVER_TARGET_QUESTION_JUST_SAY_NO, (data: any) => {
    hideAllModals();
    setIsTargetQuestionJustSayNoModalHidden(data);
  });
}
