import { ICard } from '@/interfaces'
import { useState, useMemo } from 'react'

interface PracticeSystem {
  currentCard: ICard | null
  currentCardIndex: number
  totalCards: number
  progress: number
  showAnswer: boolean
  setShowAnswer: (show: boolean) => void
  answerCard: (quality: number) => ICard | null
  skipCard: () => void
  hasNextCard: boolean
  isSessionCompleted: boolean
  resetSession: () => void
}

export const usePracticeSystem = (cards: ICard[]): PracticeSystem => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionCards, setSessionCards] = useState<ICard[]>([])

  // Filter and prepare cards for practice session
  const practiceCards = useMemo(() => {
    const now = new Date()

    const filteredCards = cards.filter(card =>
      card.status === 'new' ||
      card.status === 'learning' ||
      (card.status === 'learned' && card.nextReviewDate <= now)
    ).sort((a, b) => a.nextReviewDate.getTime() - b.nextReviewDate.getTime())

    // Initialize session cards
    setSessionCards(filteredCards)
    return filteredCards
  }, [cards])

  const currentCard = practiceCards[currentCardIndex] || null
  const totalCards = practiceCards.length
  const progress = totalCards > 0 ? ((currentCardIndex) / totalCards) * 100 : 0
  const hasNextCard = currentCardIndex < totalCards - 1
  const isSessionCompleted = currentCardIndex >= totalCards

  // SRS Algorithm (Simplified SM-2)
  const updateCardWithSRS = (card: ICard, quality: number): ICard => {
    let { interval, repetitions, easeFactor, status } = card

    if (quality >= 3) { // Correct response
      if (repetitions === 0) {
        interval = 1
      } else if (repetitions === 1) {
        interval = 6
      } else {
        interval = Math.round(interval * easeFactor)
      }

      repetitions += 1

      // Update status based on repetitions
      if (repetitions >= 3 && status === 'learning') {
        status = 'learned'
      } else if (status === 'new') {
        status = 'learning'
      }
    } else { // Incorrect response
      repetitions = 0
      interval = 1
      status = 'learning'
    }

    // Update ease factor
    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

    const nextReviewDate = new Date()
    nextReviewDate.setDate(nextReviewDate.getDate() + interval)

    return {
      ...card,
      interval,
      repetitions,
      easeFactor,
      status,
      nextReviewDate,
      lastReviewed: new Date(),
      correctCount: card.correctCount + (quality >= 3 ? 1 : 0),
      wrongCount: card.wrongCount + (quality < 3 ? 1 : 0),
      streak: quality >= 3 ? card.streak + 1 : 0
    }
  }

  const answerCard = (quality: number): ICard | null => {
    if (!currentCard) return null

    const updatedCard = updateCardWithSRS(currentCard, quality)

    // Update session cards
    const updatedSessionCards = [...sessionCards]
    updatedSessionCards[currentCardIndex] = updatedCard
    setSessionCards(updatedSessionCards)

    // Move to next card
    if (hasNextCard) {
      setCurrentCardIndex(prev => prev + 1)
      setShowAnswer(false)
    }

    return updatedCard
  }

  const skipCard = () => {
    if (hasNextCard) {
      setCurrentCardIndex(prev => prev + 1)
      setShowAnswer(false)
    }
  }

  const resetSession = () => {
    setCurrentCardIndex(0)
    setShowAnswer(false)
  }

  return {
    currentCard,
    currentCardIndex,
    totalCards,
    progress,
    showAnswer,
    setShowAnswer,
    answerCard,
    skipCard,
    hasNextCard,
    isSessionCompleted,
    resetSession
  }
}
