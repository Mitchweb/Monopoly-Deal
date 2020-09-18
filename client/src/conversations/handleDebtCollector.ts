import { Dispatch, SetStateAction } from 'react';
import SocketEvent from '../helpers/SocketEvent';

export function handleConversationDebtCollector(
  socket: SocketIOClient.Socket,
  hideAllModals: () => void,
  setIsActorQuestionDebtCollectorModalHidden: Dispatch<SetStateAction<number | undefined>>,
  setIsTargetQuestionDebtCollectorModalHidden: Dispatch<SetStateAction<boolean>>
) {
  socket.on(SocketEvent.FROM_SERVER_ACTOR_QUESTION_DEBT_COLLECTOR, (data: any) => {
    const { cardId } = data;

    hideAllModals();
    setIsActorQuestionDebtCollectorModalHidden(cardId);
  });

  socket.on(SocketEvent.FROM_SERVER_TARGET_QUESTION_DEBT_COLLECTOR, () => {
    hideAllModals();
    setIsTargetQuestionDebtCollectorModalHidden(false);
  });
}
