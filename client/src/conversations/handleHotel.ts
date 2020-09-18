import { Dispatch, SetStateAction } from 'react';
import SocketEvent from '../helpers/SocketEvent';

export function handleConversationHotel(
  socket: SocketIOClient.Socket,
  hideAllModals: () => void,
  setIsActorQuestionHotelModalHidden: Dispatch<SetStateAction<any>>
) {
  socket.on(SocketEvent.FROM_SERVER_ACTOR_QUESTION_HOTEL, (data: any) => {
    // const { cardId, fullSets } = data;

    hideAllModals();
    setIsActorQuestionHotelModalHidden(data);
  });
}
