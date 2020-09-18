import Colour from '../helpers/Colour';
import PropertyCard from './Card/PropertyCard';
import PropertyWildcard from './Card/PropertyWildcard';

class PropertySet {
  set: Colour;
  size: number;
  rent: number[];
  cards: (PropertyCard | PropertyWildcard)[];
  hasHouse: boolean;
  hasHotel: boolean;
  isCompleted: boolean;

  constructor(set: Colour, size: number, rent: number[]) {
    this.set = set;
    this.size = size;
    this.rent = rent;
    this.cards = [];
    this.hasHouse = false;
    this.hasHotel = false;
    this.isCompleted = false;
  }
}

export default PropertySet;
