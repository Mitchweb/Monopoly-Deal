import { Dispatch, SetStateAction } from 'react';
import SocketEvent from '../helpers/SocketEvent';

export function handleConversationHouse(
  socket: SocketIOClient.Socket,
  hideAllModals: () => void,
  setIsActorQuestionHouseModalHidden: Dispatch<SetStateAction<any>>
) {
  socket.on(SocketEvent.FROM_SERVER_ACTOR_QUESTION_HOUSE, (data: any) => {
    // const { cardId, fullSets } = data;

    hideAllModals();
    setIsActorQuestionHouseModalHidden(data);
  });
}
