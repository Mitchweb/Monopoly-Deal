import Game from '../classes/Game';
import SocketEvent from '../helpers/SocketEvent';
import Action from '../helpers/Action';
import _ from 'lodash';

class ConversationStateHouse {
  cardIdToRemove: number;

  constructor(cardIdToRemove: number) {
    this.cardIdToRemove = cardIdToRemove;
  }
}

export function handleConversationHouse(
  socket: SocketIO.Socket,
  game: Game,
  cardIdToRemove: number
) {
  // If current player has no full sets, do nothing.
  let willReturn = true;
  for (let propertySet of game.players[game.currentPlayer].properties) {
    if (propertySet.cards.length >= propertySet.size && !propertySet.hasHouse) {
      willReturn = false;
    }
  }
  if (willReturn) return;

  game.currentEventHandler = new ConversationStateHouse(cardIdToRemove);

  // Get valid sets (excluding Station and Utility).
  const fullSets = [];
  for (let i = 0; i < 8; i++) {
    const propertySet = game.players[game.currentPlayer].properties[i];
    if (propertySet.cards.length >= propertySet.size && !propertySet.hasHouse) {
      fullSets.push(propertySet.set);
    }
  }

  socket.emit(SocketEvent.FROM_SERVER_ACTOR_QUESTION_HOUSE, {
    cardId: cardIdToRemove,
    fullSets: fullSets
  });
  socket.broadcast.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.House });
}

export function fromClientActorResponseHouse(
  io: SocketIO.Server,
  game: Game,
  selectedSet: number,
  refreshGameState: () => void
) {
  game.players[game.currentPlayer].properties[selectedSet].hasHouse = true;

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
