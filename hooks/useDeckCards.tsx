import { useState, useEffect } from 'react'
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'

import { ICard } from '@/interfaces'
import { db } from '@/config'

export const useDeckCards = (deckId: string) => {
  const [cards, setCards] = useState<ICard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!deckId) {
      setCards([])
      setLoading(false)
      return
    }

    setLoading(true)

    const cardsRef = collection(db, 'decks', deckId, 'cards')
    const q = query(cardsRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const cardsData: ICard[] = []

        snapshot.forEach((doc) => {
          const data = doc.data()

          cardsData.push({
            id: doc.id,
            ...data,
            nextReviewDate: data.nextReviewDate?.toDate(),
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
          } as ICard)
        })

        setCards(cardsData)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [deckId])

  return {
    cards,
    loading,
    error,
  }
}
