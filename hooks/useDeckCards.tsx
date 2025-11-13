import { useState, useEffect } from 'react'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
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

  const addCard = async (cardData: Omit<ICard, 'id'>) => {
    try {
      const cardsRef = collection(db, 'decks', deckId, 'cards')
      const docRef = await addDoc(cardsRef, {
        ...cardData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return docRef.id
    } catch (err) {
      throw new Error(`Failed to add card: ${err}`)
    }
  }

  const updateCard = async (cardId: string, updates: Partial<ICard>) => {
    try {
      const cardRef = doc(db, 'decks', deckId, 'cards', cardId)
      await updateDoc(cardRef, {
        ...updates,
        updatedAt: new Date(),
      })
    } catch (err) {
      throw new Error(`Failed to update card: ${err}`)
    }
  }

  const deleteCard = async (cardId: string) => {
    try {
      const cardRef = doc(db, 'decks', deckId, 'cards', cardId)
      await deleteDoc(cardRef)
    } catch (err) {
      throw new Error(`Failed to delete card: ${err}`)
    }
  }

  return {
    cards,
    loading,
    error,
    addCard,
    updateCard,
    deleteCard,
  }
}
