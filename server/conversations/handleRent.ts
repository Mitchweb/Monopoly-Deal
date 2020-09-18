import Game from '../classes/Game';
import SocketEvent from '../helpers/SocketEvent';
import Action from '../helpers/Action';
import { getRentValue, areSubmittedCardsInvalid } from '../helpers/misc';
import _ from 'lodash';

class ConversationStateRent {
  bufferedCards: { [index: string]: number[] };
  awaitingPlayers: number;
  cardIdToRemove: number;
  doubleIdOneToRemove?: number;
  doubleIdTwoToRemove?: number;
  rentValue: number;

  constructor(awaitingPlayers: number, cardIdToRemove: number) {
    this.bufferedCards = {};
    this.awaitingPlayers = awaitingPlayers;
    this.cardIdToRemove = cardIdToRemove;
    this.doubleIdOneToRemove = undefined;
    this.doubleIdTwoToRemove = undefined;
    this.rentValue = 0;
  }
}

export function handleConversationRent(
  socket: SocketIO.Socket,
  game: Game,
  cardIdToRemove: number
) {
  game.currentEventHandler = new ConversationStateRent(game.players.length - 1, cardIdToRemove);

  socket.emit(SocketEvent.FROM_SERVER_ACTOR_QUESTION_RENT, { cardId: cardIdToRemove });
  socket.broadcast.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Rent });
}

export function fromClientActorResponseRent(
  socket: SocketIO.Socket,
  game: Game,
  selectedSet: number,
  doubleIdOne?: number,
  doubleIdTwo?: number
) {
  game.currentEventHandler.doubleIdOneToRemove = doubleIdOne;
  game.currentEventHandler.doubleIdTwoToRemove = doubleIdTwo;

  socket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Rent });

  const rentValue = getRentValue(game, selectedSet);
  game.currentEventHandler.rentValue = rentValue;

  socket.broadcast.emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_RENT, { rentValue: rentValue });

  game.currentAction = Action.Rent;
}

export function fromClientTargetResponseRent(
  io: SocketIO.Server,
  socket: SocketIO.Socket,
  game: Game,
  refreshGameState: () => void,
  cardIds: number[]
) {
  const player = game.players.filter((p) => p.id === socket.id)[0];

  if (areSubmittedCardsInvalid(player, cardIds, game.currentEventHandler.rentValue)) return;

  game.currentEventHandler.bufferedCards[socket.id] = cardIds;
  socket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Rent });

  // If all required players have added their cards to the buffer, wrap up.
  if (
    Object.keys(game.currentEventHandler.bufferedCards).length !==
    game.currentEventHandler.awaitingPlayers
  ) {
    return;
  }

  for (const [bufferedPlayerId, bufferedCardIds] of Object.entries(
    game.currentEventHandler.bufferedCards
  )) {
    const bufferedPlayer = game.players.filter((p) => p.id === bufferedPlayerId)[0];

    // Grab money.
    Array.prototype.push.apply(
      game.players[game.currentPlayer].money,
      _.remove(bufferedPlayer.money, (c) => (bufferedCardIds as number[]).includes(c.id))
    );

    // Grab properties.
    for (let i = 0; i < 10; i++) {
      Array.prototype.push.apply(
        game.players[game.currentPlayer].properties[i].cards,
        _.remove(bufferedPlayer.properties[i].cards, (c) =>
          (bufferedCardIds as number[]).includes(c.id)
        )
      );
    }
  }

  // Sort the actor's money.
  game.players[game.currentPlayer].money = _.sortBy(
    game.players[game.currentPlayer].money,
    (c) => c.value
  );

  if (game.currentEventHandler.doubleIdOneToRemove !== undefined) {
    const discardedCard = _.remove(
      game.players[game.currentPlayer].hand,
      (c) => c.id === game.currentEventHandler.doubleIdOneToRemove
    )[0];
    game.discard.push(discardedCard);
  }

  if (game.currentEventHandler.doubleIdTwoToRemove !== undefined) {
    const discardedCard = _.remove(
      game.players[game.currentPlayer].hand,
      (c) => c.id === game.currentEventHandler.doubleIdTwoToRemove
    )[0];
    game.discard.push(discardedCard);
  }

  const cardToRemove = _.remove(
    game.players[game.currentPlayer].hand,
    (c) => c.id === game.currentEventHandler.cardIdToRemove
  )[0];
  game.discard.push(cardToRemove);

  // Clean up.
  if (game.currentEventHandler.doubleIdOneToRemove !== undefined) {
    game.players[game.currentPlayer].actionsLeft--;
  }

  if (game.currentEventHandler.doubleIdTwoToRemove !== undefined) {
    game.players[game.currentPlayer].actionsLeft--;
  }

  game.currentEventHandler = undefined;
  game.players[game.currentPlayer].actionsLeft--;
  io.of('/').emit(SocketEvent.FROM_SERVER_ACTION_END_ALL);
  refreshGameState();
}
