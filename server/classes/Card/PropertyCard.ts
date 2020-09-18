import Card from './Card';
import Colour from '../../helpers/Colour';

class PropertyCard extends Card {
  name: string;
  set: Colour;

  constructor(id: number, value: number, name: string, set: Colour) {
    super(id, value);

    this.name = name;
    this.set = set;
  }
}

export default PropertyCard;
