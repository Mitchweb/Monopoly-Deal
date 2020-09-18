import { Dispatch, SetStateAction } from 'react';
import SocketEvent from '../helpers/SocketEvent';

export function handleConversationRent(
  socket: SocketIOClient.Socket,
  hideAllModals: () => void,
  setIsActorQuestionRentModalHidden: Dispatch<SetStateAction<number | undefined>>,
  setIsTargetQuestionRentModalHidden: Dispatch<SetStateAction<number | undefined>>
) {
  socket.on(SocketEvent.FROM_SERVER_ACTOR_QUESTION_RENT, (data: any) => {
    const { cardId } = data;

    hideAllModals();
    setIsActorQuestionRentModalHidden(cardId);
  });

  socket.on(SocketEvent.FROM_SERVER_TARGET_QUESTION_RENT, (data: any) => {
    const { rentValue } = data;

    hideAllModals();
    setIsTargetQuestionRentModalHidden(rentValue);
  });
}
