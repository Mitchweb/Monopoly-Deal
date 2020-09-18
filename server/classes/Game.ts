import _ from 'lodash';
import Player from './Player';
import Card from './Card/Card';
import Colour from './../helpers/Colour';
import PropertyCard from './Card/PropertyCard';
import PropertyWildcard from './Card/PropertyWildcard';
import MoneyCard from './Card/MoneyCard';
import RentCard from './Card/RentCard';
import Action from '../helpers/Action';
import ActionCard from './Card/ActionCard';

class Game {
  hasStarted: boolean;
  players: Player[];
  deck: Card[];
  discard: Card[];
  turn: number;
  currentPlayer: number;
  currentEventHandler: any;
  currentJSNEventHandler: any;
  currentAction?: Action;

  constructor() {
    this.hasStarted = false;
    this.players = [];
    this.deck = _.shuffle(this.createDeck());
    this.discard = [];
    this.turn = 1;
    this.currentPlayer = 0;
    this.currentEventHandler = undefined;
    this.currentJSNEventHandler = undefined;
    this.currentAction = undefined;
  }

  createDeck() {
    const deck = [];

    deck.push(new PropertyCard(1, 1, 'Old Kent Road', Colour.Brown));
    deck.push(new PropertyCard(2, 1, 'Whitechapel Road', Colour.Brown));
    deck.push(new PropertyCard(3, 1, 'The Angel, Islington', Colour.Light_Blue));
    deck.push(new PropertyCard(4, 1, 'Euston Road', Colour.Light_Blue));
    deck.push(new PropertyCard(5, 1, 'Pentonville Road', Colour.Light_Blue));
    deck.push(new PropertyCard(6, 2, 'Pall Mall', Colour.Pink));
    deck.push(new PropertyCard(7, 2, 'Whitehall', Colour.Pink));
    deck.push(new PropertyCard(8, 2, 'Northumberland Avenue', Colour.Pink));
    deck.push(new PropertyCard(9, 2, 'Bow Street', Colour.Orange));
    deck.push(new PropertyCard(10, 2, 'Marlborough Street', Colour.Orange));
    deck.push(new PropertyCard(11, 3, 'Vine Street', Colour.Orange));
    deck.push(new PropertyCard(12, 3, 'Strand', Colour.Red));
    deck.push(new PropertyCard(13, 3, 'Fleet Street', Colour.Red));
    deck.push(new PropertyCard(14, 3, 'Trafalgar Square', Colour.Red));
    deck.push(new PropertyCard(15, 3, 'Leicester Square', Colour.Yellow));
    deck.push(new PropertyCard(16, 3, 'Coventry Street', Colour.Yellow));
    deck.push(new PropertyCard(17, 3, 'Piccadilly', Colour.Yellow));
    deck.push(new PropertyCard(18, 4, 'Regent Street', Colour.Green));
    deck.push(new PropertyCard(19, 4, 'Oxford Street', Colour.Green));
    deck.push(new PropertyCard(20, 4, 'Bond Street', Colour.Green));
    deck.push(new PropertyCard(21, 4, 'Park Lane', Colour.Blue));
    deck.push(new PropertyCard(22, 4, 'Mayfair', Colour.Blue));
    deck.push(new PropertyCard(23, 2, 'Kings Cross Station', Colour.Station));
    deck.push(new PropertyCard(24, 2, 'Marylebone Station', Colour.Station));
    deck.push(new PropertyCard(25, 2, 'Fenchurch Street Station', Colour.Station));
    deck.push(new PropertyCard(26, 2, 'Liverpool Street Station', Colour.Station));
    deck.push(new PropertyCard(27, 2, 'Electric Company', Colour.Utility));
    deck.push(new PropertyCard(28, 2, 'Water Works', Colour.Utility));
    deck.push(new PropertyWildcard(29, 1, Colour.Brown, Colour.Light_Blue));
    deck.push(new PropertyWildcard(30, 2, Colour.Pink, Colour.Orange));
    deck.push(new PropertyWildcard(31, 2, Colour.Pink, Colour.Orange));
    deck.push(new PropertyWildcard(32, 2, Colour.Station, Colour.Utility));
    deck.push(new PropertyWildcard(33, 3, Colour.Red, Colour.Yellow));
    deck.push(new PropertyWildcard(34, 3, Colour.Red, Colour.Yellow));
    deck.push(new PropertyWildcard(35, 4, Colour.Light_Blue, Colour.Station));
    deck.push(new PropertyWildcard(36, 4, Colour.Green, Colour.Station));
    deck.push(new PropertyWildcard(37, 4, Colour.Green, Colour.Blue));
    deck.push(new PropertyWildcard(38, 0, Colour.Blue, Colour.Blue, true));
    deck.push(new PropertyWildcard(39, 0, Colour.Blue, Colour.Blue, true));
    deck.push(new MoneyCard(40, 1));
    deck.push(new MoneyCard(41, 1));
    deck.push(new MoneyCard(42, 1));
    deck.push(new MoneyCard(43, 1));
    deck.push(new MoneyCard(44, 1));
    deck.push(new MoneyCard(45, 1));
    deck.push(new MoneyCard(46, 2));
    deck.push(new MoneyCard(47, 2));
    deck.push(new MoneyCard(48, 2));
    deck.push(new MoneyCard(49, 2));
    deck.push(new MoneyCard(50, 2));
    deck.push(new MoneyCard(51, 3));
    deck.push(new MoneyCard(52, 3));
    deck.push(new MoneyCard(53, 3));
    deck.push(new MoneyCard(54, 4));
    deck.push(new MoneyCard(55, 4));
    deck.push(new MoneyCard(56, 4));
    deck.push(new MoneyCard(57, 5));
    deck.push(new MoneyCard(58, 5));
    deck.push(new MoneyCard(59, 10));
    deck.push(new RentCard(60, 1, Colour.Brown, Colour.Light_Blue));
    deck.push(new RentCard(61, 1, Colour.Brown, Colour.Light_Blue));
    deck.push(new RentCard(62, 1, Colour.Pink, Colour.Orange));
    deck.push(new RentCard(63, 1, Colour.Pink, Colour.Orange));
    deck.push(new RentCard(64, 1, Colour.Red, Colour.Yellow));
    deck.push(new RentCard(65, 1, Colour.Red, Colour.Yellow));
    deck.push(new RentCard(66, 1, Colour.Green, Colour.Blue));
    deck.push(new RentCard(67, 1, Colour.Green, Colour.Blue));
    deck.push(new RentCard(68, 1, Colour.Station, Colour.Utility));
    deck.push(new RentCard(69, 1, Colour.Station, Colour.Utility));
    deck.push(new RentCard(70, 3, Colour.Blue, Colour.Blue, true));
    deck.push(new RentCard(71, 3, Colour.Blue, Colour.Blue, true));
    deck.push(new RentCard(72, 3, Colour.Blue, Colour.Blue, true));
    deck.push(new ActionCard(73, 1, Action.Pass_Go));
    deck.push(new ActionCard(74, 1, Action.Pass_Go));
    deck.push(new ActionCard(75, 1, Action.Pass_Go));
    deck.push(new ActionCard(76, 1, Action.Pass_Go));
    deck.push(new ActionCard(77, 1, Action.Pass_Go));
    deck.push(new ActionCard(78, 1, Action.Pass_Go));
    deck.push(new ActionCard(79, 1, Action.Pass_Go));
    deck.push(new ActionCard(80, 1, Action.Pass_Go));
    deck.push(new ActionCard(81, 1, Action.Pass_Go));
    deck.push(new ActionCard(82, 1, Action.Pass_Go));
    deck.push(new ActionCard(83, 1, Action.Double_The_Rent));
    deck.push(new ActionCard(84, 1, Action.Double_The_Rent));
    deck.push(new ActionCard(85, 2, Action.Its_My_Birthday));
    deck.push(new ActionCard(86, 2, Action.Its_My_Birthday));
    deck.push(new ActionCard(87, 2, Action.Its_My_Birthday));
    deck.push(new ActionCard(88, 3, Action.Debt_Collector));
    deck.push(new ActionCard(89, 3, Action.Debt_Collector));
    deck.push(new ActionCard(90, 3, Action.Debt_Collector));
    deck.push(new ActionCard(91, 3, Action.Forced_Deal));
    deck.push(new ActionCard(92, 3, Action.Forced_Deal));
    deck.push(new ActionCard(93, 3, Action.Forced_Deal));
    deck.push(new ActionCard(94, 3, Action.Sly_Deal));
    deck.push(new ActionCard(95, 3, Action.Sly_Deal));
    deck.push(new ActionCard(96, 3, Action.Sly_Deal));
    deck.push(new ActionCard(97, 3, Action.House));
    deck.push(new ActionCard(98, 3, Action.House));
    deck.push(new ActionCard(99, 3, Action.House));
    deck.push(new ActionCard(100, 4, Action.Hotel));
    deck.push(new ActionCard(101, 4, Action.Hotel));
    deck.push(new ActionCard(102, 4, Action.Just_Say_No));
    deck.push(new ActionCard(103, 4, Action.Just_Say_No));
    deck.push(new ActionCard(104, 4, Action.Just_Say_No));
    deck.push(new ActionCard(105, 5, Action.Deal_Breaker));
    deck.push(new ActionCard(106, 5, Action.Deal_Breaker));

    return deck;
  }

  createPlayer(id: string, name: string) {
    let hand: Card[] = [];
    for (let i = 0; i < 5; i++) {
      this.drawCard(hand);
    }
    this.players.push(new Player(id, name, hand));
  }

  drawCard(hand: Card[]) {
    if (this.deck.length === 0) {
      this.reshuffleDeck();
    }

    hand.push(this.deck.pop()!);
  }

  reshuffleDeck() {
    this.deck = _.shuffle(this.discard);
    this.discard = [];
  }

  start() {
    this.hasStarted = true;

    // Shuffle order of players.
    this.players = _.shuffle(this.players);

    // Draw two cards for the first player.
    this.drawCard(this.players[this.currentPlayer].hand);
    this.drawCard(this.players[this.currentPlayer].hand);
  }

  end() {
    // Detect if any Player has three full sets.
  }

  // BEGIN PLAYER ACTIONS

  playMoney(playerId: string, cardId: number) {
    if (this.players[this.currentPlayer].id !== playerId) return;
    if (this.players[this.currentPlayer].actionsLeft <= 0) return;

    if (cardId >= 1 && cardId <= 39) return;

    const player = this.players.filter((p) => p.id === playerId)[0];
    const card = _.remove(player.hand, (c) => c.id === cardId)[0];

    player.money.push(card);
    player.money = _.sortBy(player.money, (c) => c.value);

    this.players[this.currentPlayer].actionsLeft--;
  }

  playPropertyCard(playerId: string, cardId: number) {
    if (this.players[this.currentPlayer].id !== playerId) return;
    if (this.players[this.currentPlayer].actionsLeft <= 0) return;

    if (cardId > 28) return;

    const player = this.players.filter((p) => p.id === playerId)[0];
    const card = _.remove(player.hand, (c) => c.id === cardId)[0] as PropertyCard;

    for (let set of player.properties) {
      if (set.set === card.set) {
        set.cards.push(card);
      }
    }

    this.players[this.currentPlayer].actionsLeft--;
  }

  playPropertyWildcard(playerId: string, cardId: number, isWildcardRotated: boolean) {
    if (this.players[this.currentPlayer].id !== playerId) return;
    if (this.players[this.currentPlayer].actionsLeft <= 0) return;

    if (cardId < 29 || cardId > 37) return;

    const player = this.players.filter((p) => p.id === playerId)[0];
    const card = _.remove(player.hand, (c) => c.id === cardId)[0] as PropertyWildcard;

    for (let set of player.properties) {
      if (isWildcardRotated) {
        if (set.set === card.setTwo) {
          set.cards.push(card);
        }
      } else {
        if (set.set === card.setOne) {
          set.cards.push(card);
        }
      }
    }

    this.players[this.currentPlayer].actionsLeft--;
  }

  playPropertyWildcardAll(playerId: string, cardId: number, selectedSet: number) {
    if (this.players[this.currentPlayer].id !== playerId) return;
    if (this.players[this.currentPlayer].actionsLeft <= 0) return;

    if (cardId < 38 || cardId > 39) return;

    const player = this.players.filter((p) => p.id === playerId)[0];
    const card = _.remove(player.hand, (c) => c.id === cardId)[0] as PropertyWildcard;

    for (let this_set of player.properties) {
      if (this_set.set.valueOf() === selectedSet) {
        this_set.cards.push(card);
      }
    }

    this.players[this.currentPlayer].actionsLeft--;
  }

  playPassGo(playerId: string, cardId: number) {
    // Security checks.
    if (this.players[this.currentPlayer].id !== playerId) return;
    if (this.players[this.currentPlayer].actionsLeft <= 0) return;
    if (cardId < 73 || cardId > 82) return;

    // START ACTION
    const currentPlayer = this.players[this.currentPlayer];

    const discardedCard = _.remove(currentPlayer.hand, (c) => c.id === cardId)[0];
    this.discard.push(discardedCard);

    this.drawCard(currentPlayer.hand);
    this.drawCard(currentPlayer.hand);
    // END ACTION

    // Clean up.
    currentPlayer.actionsLeft--;
  }

  endTurn(playerId: string) {
    // Security checks.
    if (this.players[this.currentPlayer].id !== playerId) return;

    // Reset the current player's actions.
    this.players[this.currentPlayer].actionsLeft = 3;

    // Shuffle their hand up!
    while (this.players[this.currentPlayer].hand.length > 7) {
      const start = Math.floor(Math.random() * this.players[this.currentPlayer].hand.length);

      const card = this.players[this.currentPlayer].hand.splice(start, 1)[0];

      this.discard.push(card);
    }

    // Choose the next player.
    if (this.currentPlayer >= this.players.length - 1) {
      this.currentPlayer = 0;
    } else {
      this.currentPlayer++;
    }

    if (this.players[this.currentPlayer].hand.length === 0) {
      // Draw five cards for the next player.
      this.drawCard(this.players[this.currentPlayer].hand);
      this.drawCard(this.players[this.currentPlayer].hand);
      this.drawCard(this.players[this.currentPlayer].hand);
      this.drawCard(this.players[this.currentPlayer].hand);
      this.drawCard(this.players[this.currentPlayer].hand);
    } else {
      // Draw two cards for the next player.
      this.drawCard(this.players[this.currentPlayer].hand);
      this.drawCard(this.players[this.currentPlayer].hand);
    }

    this.turn++;
  }

  // END PLAYER ACTIONS
}

export default Game;
