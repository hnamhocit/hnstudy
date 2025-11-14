import { db } from "@/config"
import { ICard } from "@/interfaces"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"

export const cardController = {
  delete: async (deckId: string, id: string) => {
    await deleteDoc(doc(db, "desks", deckId, "cards", id))
  },

  create: async (deckId: string, cardData: Omit<ICard, 'id'>) => {
    const cardsRef = collection(db, 'decks', deckId, 'cards')
    const docRef = await addDoc(cardsRef, {
      ...cardData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return docRef.id
  },

  update: async (deckId: string, cardId: string, updates: Partial<ICard>) => {
    const cardRef = doc(db, 'decks', deckId, 'cards', cardId)
    await updateDoc(cardRef, {
      ...updates,
      updatedAt: new Date(),
    })
  },
}
