import Game from '../classes/Game';
import SocketEvent from '../helpers/SocketEvent';
import Action from '../helpers/Action';
import { areSubmittedCardsInvalid } from '../helpers/misc';
import _ from 'lodash';

class ConversationStateDebtCollector {
  bufferedCards: { [index: string]: number[] };
  awaitingPlayers: number;
  cardIdToRemove: number;
  target?: string;

  constructor(awaitingPlayers: number, cardIdToRemove: number) {
    this.bufferedCards = {};
    this.awaitingPlayers = awaitingPlayers;
    this.cardIdToRemove = cardIdToRemove;
    this.target = undefined;
  }
}

export function handleConversationDebtCollector(
  socket: SocketIO.Socket,
  game: Game,
  cardIdToRemove: number
) {
  game.currentEventHandler = new ConversationStateDebtCollector(1, cardIdToRemove);

  socket.emit(SocketEvent.FROM_SERVER_ACTOR_QUESTION_DEBT_COLLECTOR, { cardId: cardIdToRemove });
  socket.broadcast.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Debt_Collector });
}

export function fromClientActorResponseDebtCollector(
  socket: SocketIO.Socket,
  game: Game,
  selectedPlayer: string
) {
  socket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Debt_Collector });

  const target = game.players.filter((p) => p.name === selectedPlayer)[0].id;

  game.currentEventHandler.target = target;

  socket.to(target).emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_DEBT_COLLECTOR);

  game.currentAction = Action.Debt_Collector;
}

export function fromClientTargetResponseDebtCollector(
  io: SocketIO.Server,
  socket: SocketIO.Socket,
  game: Game,
  refreshGameState: () => void,
  cardIds: number[]
) {
  const player = game.players.filter((p) => p.id === socket.id)[0];

  if (areSubmittedCardsInvalid(player, cardIds, 5)) return;

  game.currentEventHandler.bufferedCards[socket.id] = cardIds;
  socket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Debt_Collector });

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
