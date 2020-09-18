import Card from './Card';
import Colour from '../../helpers/Colour';

class PropertyWildcard extends Card {
  setOne: Colour;
  setTwo: Colour;
  isAllSets: boolean;

  constructor(
    id: number,
    value: number,
    setOne: Colour,
    setTwo: Colour,
    isAllSets: boolean = false
  ) {
    super(id, value);

    this.setOne = setOne;
    this.setTwo = setTwo;
    this.isAllSets = isAllSets;
  }
}

export default PropertyWildcard;
