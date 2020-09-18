import { Dispatch, SetStateAction } from 'react';
import SocketEvent from '../helpers/SocketEvent';

export function handleConversationSlyDeal(
  socket: SocketIOClient.Socket,
  hideAllModals: () => void,
  setIsActorQuestionSlyDealModalAHidden: Dispatch<SetStateAction<number | undefined>>,
  setIsTargetQuestionSlyDealModalHidden: Dispatch<SetStateAction<any>>
) {
  socket.on(SocketEvent.FROM_SERVER_ACTOR_QUESTION_SLY_DEAL, (data: any) => {
    const { cardId } = data;

    hideAllModals();
    setIsActorQuestionSlyDealModalAHidden(cardId);
  });

  socket.on(SocketEvent.FROM_SERVER_TARGET_QUESTION_SLY_DEAL, (data: any) => {
    const { targetCardIdToSwap } = data;

    hideAllModals();
    setIsTargetQuestionSlyDealModalHidden({
      targetCardIdToSwap: targetCardIdToSwap
    });
  });
}
