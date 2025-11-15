import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid'

import { db } from "@/config"
import { INote } from "@/interfaces/note"
import { useUserStore } from "@/stores"

export type CreateNoteValues = {
  title: string
  content: string
  tags: string[]
  category: string
}

export const noteController = {
  delete: async (id: string) => {
    await deleteDoc(doc(db, "notes", id))
  },

  update: async (id: string, data: Partial<INote>) => {
    await updateDoc(doc(db, 'notes', id), { ...data, updatedAt: Date.now() })
  },

  create: async (data: CreateNoteValues) => {
    const id = uuidv4()
    const date = Date.now()
    const userId = useUserStore.getState().user!.id
    const _data: INote = { id, createdAt: date, updatedAt: date, ...data, isPinned: false, userId }
    await setDoc(doc(db, "notes", id), _data)
  }
}
