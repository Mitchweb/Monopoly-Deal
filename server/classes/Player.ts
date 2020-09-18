import PropertySet from './PropertySet';
import Card from './Card/Card';
import MoneyCard from './Card/MoneyCard';
import Colour from '../helpers/Colour';

class Player {
  id: string;
  name: string;
  hand: Card[];
  money: MoneyCard[];
  properties: PropertySet[];
  actionsLeft: number;

  constructor(id: string, name: string, hand: Card[]) {
    this.id = id;
    this.name = name;
    this.hand = hand;
    this.money = [];
    this.properties = [
      new PropertySet(Colour.Brown, 2, [1, 2]),
      new PropertySet(Colour.Light_Blue, 3, [1, 2, 3]),
      new PropertySet(Colour.Pink, 3, [1, 2, 4]),
      new PropertySet(Colour.Orange, 3, [1, 3, 5]),
      new PropertySet(Colour.Red, 3, [2, 3, 6]),
      new PropertySet(Colour.Yellow, 3, [2, 4, 6]),
      new PropertySet(Colour.Green, 3, [2, 4, 7]),
      new PropertySet(Colour.Blue, 2, [3, 8]),
      new PropertySet(Colour.Station, 4, [1, 2, 3, 4]),
      new PropertySet(Colour.Utility, 2, [1, 2])
    ];
    this.actionsLeft = 3;
  }
}

export default Player;
