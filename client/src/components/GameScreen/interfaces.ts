export interface ICard {
  id: number;
  value: number;
}

export interface IActionCard extends ICard {
  action: number;
}

export interface IPropertyCard extends ICard {
  name: string;
  set: number;
}

export interface IPropertyWildcard extends ICard {
  setOne: number;
  setTwo: number;
  isAllSets: boolean;
}

export interface IRentCard extends ICard {
  setOne: number;
  setTwo: number;
  isAllSets: boolean;
}

export interface IMoneyCard extends ICard {}

export interface IPropertySet {
  set: number;
  size: number;
  rent: number[];
  cards: (IPropertyCard | IPropertyWildcard)[];
  hasHouse: boolean;
  hasHotel: boolean;
  isCompleted: boolean;
}

export interface IPlayer {
  name: string;
  handCount: number;
  moneyCount: number;
  properties: IPropertySet[];
}

export interface IGameState {
  players: IPlayer[];
  currentPlayer: string;
  deckCount: number;
  turn: number;
}
