import { CardStatus, ICard } from "@/interfaces"

const filterAndGetLen = (cards: ICard[], status: CardStatus) => {
  return cards.filter(c => c.status === status).length
}

const getCardAccuracy = (card: ICard) => {
  const totalReviews = card.correctCount + card.wrongCount
  if (totalReviews === 0) return 0
  return (card.correctCount / totalReviews) * 100
}

const getAverageAccuracy = (cards: ICard[]) => {
  if (cards.length === 0) return 0

  const totalAccuracy = cards.reduce((sum, card) => {
    return sum + getCardAccuracy(card)
  }, 0)

  return totalAccuracy / cards.length
}

export const getCardsStats = (cards: ICard[]) => {
  const learned = filterAndGetLen(cards, 'learned')

  return {
    learned: learned,
    learning: filterAndGetLen(cards, "learning"),
    new: filterAndGetLen(cards, 'new'),
    progress: cards.length === 0 ? 0 : (learned / cards.length) * 100,
    accuracy: getAverageAccuracy(cards)
  }
}

