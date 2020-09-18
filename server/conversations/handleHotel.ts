import Game from '../classes/Game';
import SocketEvent from '../helpers/SocketEvent';
import Action from '../helpers/Action';
import _ from 'lodash';

class ConversationStateHotel {
  cardIdToRemove: number;

  constructor(cardIdToRemove: number) {
    this.cardIdToRemove = cardIdToRemove;
  }
}

export function handleConversationHotel(
  socket: SocketIO.Socket,
  game: Game,
  cardIdToRemove: number
) {
  // If current player has no valid sets (with houses), do nothing.
  let willReturn = true;
  for (let propertySet of game.players[game.currentPlayer].properties) {
    if (propertySet.hasHouse && !propertySet.hasHotel) {
      willReturn = false;
    }
  }
  if (willReturn) return;

  game.currentEventHandler = new ConversationStateHotel(cardIdToRemove);

  // Get valid sets (excluding Station and Utility).
  const validSets = [];
  for (let i = 0; i < 8; i++) {
    const propertySet = game.players[game.currentPlayer].properties[i];
    if (propertySet.hasHouse && !propertySet.hasHotel) {
      validSets.push(propertySet.set);
    }
  }

  socket.emit(SocketEvent.FROM_SERVER_ACTOR_QUESTION_HOTEL, {
    cardId: cardIdToRemove,
    validSets: validSets
  });
  socket.broadcast.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Hotel });
}

export function fromClientActorResponseHotel(
  io: SocketIO.Server,
  game: Game,
  selectedSet: number,
  refreshGameState: () => void
) {
  game.players[game.currentPlayer].properties[selectedSet].hasHotel = true;

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
