import Player from '../classes/Player';
import Game from '../classes/Game';

export function areSubmittedCardsInvalid(
  player: Player,
  cardIds: number[],
  requiredTotalValue: number
) {
  let totalValue = 0;

  // Add value of all submitted money to totalValue.
  player.money.filter((c) => cardIds.includes(c.id)).map((c) => (totalValue += c.value));

  // Add value of all submitted properties to totalValue.
  for (let i = 0; i < 10; i++) {
    player.properties[i].cards
      .filter((c) => cardIds.includes(c.id))
      .map((c) => (totalValue += c.value));
  }

  // Check if they're cheating.
  if (totalValue < requiredTotalValue) {
    let isCheating = false;

    if (player.money.filter((c) => !cardIds.includes(c.id)).length > 0) {
      isCheating = true;
    }

    for (let propertySet of player.properties) {
      const leftoverCards = propertySet.cards.filter((c) => !cardIds.includes(c.id));
      if (leftoverCards.length > 0) {
        for (let card of leftoverCards) {
          if (card.id < 38 || card.id > 39) {
            isCheating = true;
          }
        }
      }
    }

    return isCheating;
  }

  return false;
}

export function getRentValue(game: Game, selectedSet: number) {
  const actor = game.players[game.currentPlayer];

  let rentIndex = actor.properties[selectedSet].cards.length - 1;
  if (rentIndex > actor.properties[selectedSet].size) {
    rentIndex = actor.properties[selectedSet].size - 1;
  }

  let rentValue = actor.properties[selectedSet].rent[rentIndex];

  if (actor.properties[selectedSet].hasHouse) {
    rentValue += 3;
  }

  if (actor.properties[selectedSet].hasHotel) {
    rentValue += 4;
  }

  if (game.currentEventHandler.doubleIdOneToRemove !== undefined) {
    rentValue = rentValue * 2;
  }

  if (game.currentEventHandler.doubleIdTwoToRemove !== undefined) {
    rentValue = rentValue * 2;
  }

  return rentValue;
}
