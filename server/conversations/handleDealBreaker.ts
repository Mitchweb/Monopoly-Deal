import Game from '../classes/Game';
import SocketEvent from '../helpers/SocketEvent';
import Action from '../helpers/Action';
import _ from 'lodash';

class ConversationStateDealBreaker {
  cardIdToRemove: number;
  targetPlayerName?: string;
  targetSet?: number;
  target?: string;

  constructor(cardIdToRemove: number) {
    this.cardIdToRemove = cardIdToRemove;
    this.targetPlayerName = undefined;
    this.targetSet = undefined;
    this.target = undefined;
  }
}

export function handleConversationDealBreaker(
  socket: SocketIO.Socket,
  game: Game,
  cardIdToRemove: number
) {
  game.currentEventHandler = new ConversationStateDealBreaker(cardIdToRemove);

  // Get valid players.
  let validPlayers: string[] = [];
  for (let i = 0; i < game.players.length; i++) {
    if (i === game.currentPlayer) continue;

    const player = game.players[i];

    for (let propertySet of player.properties) {
      if (propertySet.cards.length >= propertySet.size) {
        validPlayers.push(player.name);
        break;
      }
    }
  }

  socket.emit(SocketEvent.FROM_SERVER_ACTOR_QUESTION_DEAL_BREAKER, {
    cardId: cardIdToRemove,
    validPlayers: validPlayers
  });
  socket.broadcast.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Deal_Breaker });
}

export function fromClientActorResponseDealBreaker(
  socket: SocketIO.Socket,
  game: Game,
  targetPlayerName: string,
  targetSet: number
) {
  socket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Deal_Breaker });

  game.currentEventHandler.targetPlayerName = targetPlayerName;
  game.currentEventHandler.targetSet = targetSet;

  const target = game.players.filter((p) => p.name === targetPlayerName)[0].id;

  game.currentEventHandler.target = target;

  socket.to(target).emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_DEAL_BREAKER, {
    targetSet: targetSet
  });

  game.currentAction = Action.Deal_Breaker;
}

export function fromClientTargetResponseDealBreaker(
  io: SocketIO.Server,
  game: Game,
  refreshGameState: () => void
) {
  const actor = game.players[game.currentPlayer];
  const target = game.players.filter(
    (p) => p.name === game.currentEventHandler.targetPlayerName
  )[0];

  const i = game.currentEventHandler.targetSet;
  const targetPropertySet = target.properties[i];

  // Add stuff to Actor stuff.
  for (let card of targetPropertySet.cards) {
    actor.properties[i].cards.push(card);
  }
  if (targetPropertySet.hasHouse) {
    actor.properties[i].hasHouse = true;
  }

  if (targetPropertySet.hasHotel) {
    actor.properties[i].hasHotel = true;
  }

  // Remove stuff from Target stuff.
  targetPropertySet.cards = [];
  targetPropertySet.hasHouse = false;
  targetPropertySet.hasHotel = false;

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
