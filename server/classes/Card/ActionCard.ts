import Card from './Card';
import Action from '../../helpers/Action';

class ActionCard extends Card {
  action: Action;

  constructor(id: number, value: number, action: Action) {
    super(id, value);

    this.action = action;
  }
}

export default ActionCard;
