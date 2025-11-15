import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/config'
import { IDeck } from '@/interfaces'
import { useUserStore } from '@/stores'

export const deckController = {
  create: async (name: string, description: string, isPublic: boolean) => {
    const id = uuidv4()

    const date = Date.now()
    const newDeskData: IDeck = {
      id,
      createdAt: date,
      updatedAt: date,
      name,
      description,
      isPublic,
      wordCount: 0,
      userId: useUserStore.getState().user!.id
    }

    await setDoc(doc(db, "decks", id), newDeskData)
  },

  delete: async (id: string) => {
    await deleteDoc(doc(db, "decks", id))
  },

  update: async (id: string, data: Partial<IDeck>) => {
    await updateDoc(doc(db, "decks", id), { ...data, updatedAt: Date.now() })
  }
}
