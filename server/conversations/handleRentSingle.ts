import Game from '../classes/Game';
import SocketEvent from '../helpers/SocketEvent';
import Action from '../helpers/Action';
import { areSubmittedCardsInvalid, getRentValue } from '../helpers/misc';
import _ from 'lodash';

class ConversationStateRentSingle {
  bufferedCards: { [index: string]: number[] };
  awaitingPlayers: number;
  cardIdToRemove: number;
  doubleIdOneToRemove?: number;
  doubleIdTwoToRemove?: number;
  rentValue: number;
  target?: string;

  constructor(awaitingPlayers: number, cardIdToRemove: number) {
    this.bufferedCards = {};
    this.awaitingPlayers = awaitingPlayers;
    this.cardIdToRemove = cardIdToRemove;
    this.doubleIdOneToRemove = undefined;
    this.doubleIdTwoToRemove = undefined;
    this.rentValue = 0;
    this.target = undefined;
  }
}

export function handleConversationRentSingle(
  socket: SocketIO.Socket,
  game: Game,
  cardIdToRemove: number
) {
  game.currentEventHandler = new ConversationStateRentSingle(1, cardIdToRemove);

  socket.emit(SocketEvent.FROM_SERVER_ACTOR_QUESTION_RENT_SINGLE, { cardId: cardIdToRemove });
  socket.broadcast.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Rent });
}

export function fromClientActorResponseRentSingle(
  socket: SocketIO.Socket,
  game: Game,
  selectedSet: number,
  targetPlayerName: string,
  doubleIdOne?: number,
  doubleIdTwo?: number
) {
  game.currentEventHandler.doubleIdOneToRemove = doubleIdOne;
  game.currentEventHandler.doubleIdTwoToRemove = doubleIdTwo;

  socket.emit(SocketEvent.FROM_SERVER_ACTION_PENDING, { action: Action.Rent });

  const rentValue = getRentValue(game, selectedSet);
  game.currentEventHandler.rentValue = rentValue;

  const target = game.players.filter((p) => p.name === targetPlayerName)[0].id;

  game.currentEventHandler.target = target;

  socket.to(target).emit(SocketEvent.FROM_SERVER_TARGET_QUESTION_RENT, { rentValue: rentValue });

  game.currentAction = Action.Rent_Single;
}