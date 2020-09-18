import Game from '../classes/Game';
import SocketEvent from '../helpers/SocketEvent';
import Action from '../helpers/Action';
import _ from 'lodash';

class ConversationStateSlyDeal {
  cardIdToRemove: number;
  targetPlayerName?: string;
  targetCardIdToSwap?: number;
  target?: string;

  constructor(cardIdToRemove: number) {
    this.cardIdToRemove = cardIdToRemove;
    this.targetPlayerName = undefined;
    this.targetCardIdToSwap = undefined;
    this.target = undefined;
  }
}

export function handleConversationSlyDeal(
  socket: SocketIO.Socket,
  game: Game,
  cardIdToRemove: number
) {
  game.currentEventHandler = new ConversationStateSlyDeal(cardIdToRemove);

  socket.emit(SocketEvent.FROM_SERVER_ACTOR_QUESTION_SLY_DEAL, { cardId: cardIdToRemove });
  socket.broadcast.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Sly_Deal });
}

export function fromClientActorResponseSlyDeal(
  socket: SocketIO.Socket,
  game: Game,
  targetPlayerName: string,
  targetCardIdToSwap: number
) {
  socket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Sly_Deal });

  game.currentEventHandler.targetPlayerName = targetPlayerName;
  game.currentEventHandler.targetCardIdToSwap = targetCardIdToSwap;

  const target = game.players.filter((p) => p.name === targetPlayerName)[0].id;

  game.currentEventHandler.target = target;

  socket.to(target).emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_SLY_DEAL, {
    targetCardIdToSwap: targetCardIdToSwap
  });

  game.currentAction = Action.Sly_Deal;
}

export function fromClientTargetResponseSlyDeal(
  io: SocketIO.Server,
  game: Game,
  refreshGameState: () => void
) {
  const actor = game.players[game.currentPlayer];
  const target = game.players.filter(
    (p) => p.name === game.currentEventHandler.targetPlayerName
  )[0];

  for (let i = 0; i < 10; i++) {
    if (target.properties[i].cards.length === target.properties[i].size) continue;

    const targetCard = _.remove(
      target.properties[i].cards,
      (c) => c.id === game.currentEventHandler.targetCardIdToSwap
    );

    if (targetCard.length !== 0) {
      actor.properties[i].cards.push(targetCard[0]);
    }
  }

  const cardToRemove = _.remove(
    game.players[game.currentPlayer].hand,
    (c) => c.id === game.currentEventHandler.cardIdToRemove
  )[0];
  game.discard.push(cardToRemove);

  // Clean up.
  game.currentEventHandler = undefined;
  game.players[game.currentPlayer].actionsLeft--;
  io.of('/').emit(SocketEvent.FROM_SERVER_ACTION_END_ALL);
  refreshGameState();
}
