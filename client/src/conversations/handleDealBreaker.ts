import { Dispatch, SetStateAction } from 'react';
import SocketEvent from '../helpers/SocketEvent';

export function handleConversationDealBreaker(
  socket: SocketIOClient.Socket,
  hideAllModals: () => void,
  setIsActorQuestionDealBreakerModalAHidden: Dispatch<SetStateAction<number | undefined>>,
  setIsTargetQuestionDealBreakerModalHidden: Dispatch<SetStateAction<any>>
) {
  socket.on(SocketEvent.FROM_SERVER_ACTOR_QUESTION_DEAL_BREAKER, (data: any) => {
    hideAllModals();
    setIsActorQuestionDealBreakerModalAHidden(data);
  });

  socket.on(SocketEvent.FROM_SERVER_TARGET_QUESTION_DEAL_BREAKER, (data: any) => {
    const { targetSet } = data;

    hideAllModals();
    setIsTargetQuestionDealBreakerModalHidden({
      targetSet: targetSet
    });
  });
}
