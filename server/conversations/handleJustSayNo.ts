import Game from '../classes/Game';
import _ from 'lodash';
import SocketEvent from '../helpers/SocketEvent';
import Action from '../helpers/Action';

class ConversationStateJustSayNo {
  actionTarget: string;
  count: number;

  constructor(actionTarget: string) {
    this.actionTarget = actionTarget;
    this.count = 0;
  }
}

export function fromClientTargetResponseJustSayNo(
  socket: SocketIO.Socket,
  game: Game,
  cardId: number,
  refreshGameState: () => void
) {
  const player = game.players.filter((p) => p.id === socket.id)[0];
  // If player doesn't have the Just Say No card, stop.
  if (player.hand.filter((c) => c.id === cardId).length === 0) return;

  // Discard the Just Say No card that was just played.
  const discardedCard = _.remove(
    game.players.filter((p) => p.name === player.name)[0].hand,
    (c) => c.id === cardId
  )[0];
  game.discard.push(discardedCard);

  let to = '';
  if (player.id !== game.players[game.currentPlayer].id) {
    // Target just played a Just Say No (1st or 3rd pass).
    to = game.players[game.currentPlayer].id;
  } else {
    // Actor just played a Just Say No (2nd pass).
    // At this point, we have a currentJSNEventHandler, which stores the value needed.
    to = game.currentJSNEventHandler.actionTarget;
  }

  socket
    .to(to)
    .emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_JUST_SAY_NO, { playerName: player.name });

  // We make a JSN Event Handler to fill in what we need for second pass,
  // only if the handler doesn't exist already.
  game.currentJSNEventHandler =
    game.currentJSNEventHandler || new ConversationStateJustSayNo(player.id);

  game.currentJSNEventHandler.count++;

  refreshGameState();
}

export function endJustSayNoConversation(
  io: SocketIO.Server,
  game: Game,
  refreshGameState: () => void
) {
  if (game.currentJSNEventHandler.count === 2) {
    // Actor won, so initiate the original action.
    const actorSocket = io.sockets.sockets[game.players[game.currentPlayer].id];

    switch (game.currentAction) {
      case Action.Its_My_Birthday:
        actorSocket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, {
          action: Action.Its_My_Birthday
        });
        actorSocket.broadcast.emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_IMB);
        break;
      case Action.Debt_Collector:
        actorSocket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, {
          action: Action.Debt_Collector
        });
        actorSocket
          .to(game.currentEventHandler.target)
          .emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_DEBT_COLLECTOR);
        break;
      case Action.Forced_Deal:
        actorSocket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Forced_Deal });
        actorSocket
          .to(game.currentEventHandler.target)
          .emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_FORCED_DEAL, {
            actorName: game.players[game.currentPlayer].name,
            targetCardIdToSwap: game.currentEventHandler.targetCardIdToSwap,
            actorCardIdToSwap: game.currentEventHandler.actorCardIdToSwap
          });
        break;
      case Action.Sly_Deal:
        actorSocket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Sly_Deal });
        actorSocket
          .to(game.currentEventHandler.target)
          .emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_SLY_DEAL, {
            targetCardIdToSwap: game.currentEventHandler.targetCardIdToSwap
          });
        break;
      case Action.Deal_Breaker:
        actorSocket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Deal_Breaker });
        actorSocket
          .to(game.currentEventHandler.target)
          .emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_DEAL_BREAKER, {
            targetSet: game.currentEventHandler.targetSet
          });
        break;
      case Action.Rent:
        actorSocket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Rent });
        actorSocket.broadcast.emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_RENT, {
          rentValue: game.currentEventHandler.rentValue
        });
        break;
      case Action.Rent_Single:
        actorSocket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Rent });
        actorSocket
          .to(game.currentEventHandler.target)
          .emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_RENT, {
            rentValue: game.currentEventHandler.rentValue
          });
        break;
      default:
        console.log('Uh oh!');
        break;
    }
  }

  // Clean up.
  if (game.currentJSNEventHandler.count !== 2) {
    // If the actor lost, clean up everything.

    const cardToRemove = _.remove(
      game.players[game.currentPlayer].hand,
      (c) => c.id === game.currentEventHandler.cardIdToRemove
    )[0];
    game.discard.push(cardToRemove);

    game.currentJSNEventHandler = undefined;

    game.currentEventHandler = undefined;
    game.players[game.currentPlayer].actionsLeft--;
    io.of('/').emit(SocketEvent.FROM_SERVER_ACTION_END_ALL);
    refreshGameState();
    
    return;
  }

  // If the actor won, only clean up the JSN stuff.
  // Other clean up will be handled when the target submits their response.
  game.currentJSNEventHandler = undefined;
  refreshGameState();
}
