import { Dispatch, SetStateAction } from 'react';
import SocketEvent from '../helpers/SocketEvent';

export function handleConversationForcedDeal(
  socket: SocketIOClient.Socket,
  hideAllModals: () => void,
  setIsActorQuestionForcedDealModalAHidden: Dispatch<SetStateAction<number | undefined>>,
  setIsTargetQuestionForcedDealModalHidden: Dispatch<SetStateAction<any>>
) {
  socket.on(SocketEvent.FROM_SERVER_ACTOR_QUESTION_FORCED_DEAL, (data: any) => {
    const { cardId } = data;

    hideAllModals();
    setIsActorQuestionForcedDealModalAHidden(cardId);
  });

  socket.on(SocketEvent.FROM_SERVER_TARGET_QUESTION_FORCED_DEAL, (data: any) => {
    const { actorName, targetCardIdToSwap, actorCardIdToSwap } = data;

    hideAllModals();
    setIsTargetQuestionForcedDealModalHidden({
      actorName: actorName,
      targetCardIdToSwap: targetCardIdToSwap,
      actorCardIdToSwap: actorCardIdToSwap
    });
  });
}
