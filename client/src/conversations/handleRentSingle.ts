import { Dispatch, SetStateAction } from 'react';
import SocketEvent from '../helpers/SocketEvent';

export function handleConversationRentSingle(
  socket: SocketIOClient.Socket,
  hideAllModals: () => void,
  setIsActorQuestionRentSingleModalHidden: Dispatch<SetStateAction<number | undefined>>
) {
  socket.on(SocketEvent.FROM_SERVER_ACTOR_QUESTION_RENT_SINGLE, (data: any) => {
    const { cardId } = data;

    hideAllModals();
    setIsActorQuestionRentSingleModalHidden(cardId);
  });
}
