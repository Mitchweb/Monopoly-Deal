import Game from '../classes/Game';
import SocketEvent from '../helpers/SocketEvent';
import Action from '../helpers/Action';
import _ from 'lodash';

class ConversationStateForcedDeal {
  cardIdToRemove: number;
  targetPlayerName?: string;
  actorCardIdToSwap?: number;
  targetCardIdToSwap?: number;
  target?: string;

  constructor(cardIdToRemove: number) {
    this.cardIdToRemove = cardIdToRemove;
    this.targetPlayerName = undefined;
    this.actorCardIdToSwap = undefined;
    this.targetCardIdToSwap = undefined;
    this.target = undefined;
  }
}

export function handleConversationForcedDeal(
  socket: SocketIO.Socket,
  game: Game,
  cardIdToRemove: number
) {
  // If current player has no properties of their own, do nothing.
  let willReturn = true;
  for (let propertySet of game.players[game.currentPlayer].properties) {
    if (propertySet.cards.length > 0) {
      willReturn = false;
    }
  }

  if (willReturn) return;

  game.currentEventHandler = new ConversationStateForcedDeal(cardIdToRemove);

  socket.emit(SocketEvent.FROM_SERVER_ACTOR_QUESTION_FORCED_DEAL, { cardId: cardIdToRemove });
  socket.broadcast.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Forced_Deal });
}

export function fromClientActorResponseForcedDeal(
  socket: SocketIO.Socket,
  game: Game,
  targetPlayerName: string,
  actorCardIdToSwap: number,
  targetCardIdToSwap: number
) {
  socket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Forced_Deal });

  game.currentEventHandler.targetPlayerName = targetPlayerName;
  game.currentEventHandler.actorCardIdToSwap = actorCardIdToSwap;
  game.currentEventHandler.targetCardIdToSwap = targetCardIdToSwap;

  const target = game.players.filter((p) => p.name === targetPlayerName)[0].id;

  game.currentEventHandler.target = target;

  socket.to(target).emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_FORCED_DEAL, {
    actorName: game.players[game.currentPlayer].name,
    targetCardIdToSwap: targetCardIdToSwap,
    actorCardIdToSwap: actorCardIdToSwap
  });

  game.currentAction = Action.Forced_Deal;
}

export function fromClientTargetResponseForcedDeal(
  io: SocketIO.Server,
  game: Game,
  refreshGameState: () => void
) {
  const actor = game.players[game.currentPlayer];
  const target = game.players.filter(
    (p) => p.name === game.currentEventHandler.targetPlayerName
  )[0];

  for (let i = 0; i < 10; i++) {
    // if (actor.properties[i].cards.length === actor.properties[i].size) return;
    // If actor has a full set... Do we care?

    const actorCard = _.remove(
      actor.properties[i].cards,
      (c) => c.id === game.currentEventHandler.actorCardIdToSwap
    );

    if (actorCard.length !== 0) {
      target.properties[i].cards.push(actorCard[0]);
    }
  }

  for (let i = 0; i < 10; i++) {
    // If target has a full set, don't allow the swap.
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
