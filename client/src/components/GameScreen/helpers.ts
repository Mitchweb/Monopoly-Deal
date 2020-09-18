import { ICard } from './interfaces';

export function getType(card: ICard) {
  if (card.id >= 1 && card.id <= 28) {
    return 'PropertyCard';
  }

  if (card.id >= 29 && card.id <= 39) {
    return 'PropertyWildcard';
  }

  if (card.id >= 40 && card.id <= 59) {
    return 'MoneyCard';
  }

  if (card.id >= 60 && card.id <= 72) {
    return 'RentCard';
  }

  if (card.id >= 73 && card.id <= 106) {
    return 'ActionCard';
  }
}

export function getTypeById(cardId: number) {
  if (cardId >= 1 && cardId <= 28) {
    return 'PropertyCard';
  }

  if (cardId >= 29 && cardId <= 39) {
    return 'PropertyWildcard';
  }

  if (cardId >= 40 && cardId <= 59) {
    return 'MoneyCard';
  }

  if (cardId >= 60 && cardId <= 72) {
    return 'RentCard';
  }

  if (cardId >= 73 && cardId <= 106) {
    return 'ActionCard';
  }
}