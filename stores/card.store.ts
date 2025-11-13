import { IExample } from "@/interfaces";
import { create } from "zustand";

interface Phonetic {
  text: string
  audio: string
  sourceUrl: string
}

interface Definition {
  definition: string
  synonyms: string[]
  antonyms: string[]
}

interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
}

interface SelectedItems {
  partOfSpeech: string | null
  phonetic: Phonetic | null
}

interface CardStore {
  front: string
  setFront: (value: string) => void
  meanings: Meaning[]
  setMeanings: (meanings: Meaning[]) => void
  phonetics: Phonetic[]
  setPhonetics: (phonetics: Phonetic[]) => void
  note: string
  setNote: (value: string) => void
  examples: IExample[]
  setExamples: (examples: IExample[]) => void
  selected: SelectedItems
  setSelected: (value: SelectedItems) => void
  from: string
  setFrom: (value: string) => void
  to: string
  setTo: (value: string) => void
}

export const useCardStore = create<CardStore>(set => ({
  front: "",
  setFront: (value) => set({ front: value }),
  meanings: [],
  setMeanings: meanings => set({ meanings }),
  phonetics: [],
  setPhonetics: phonetics => set({ phonetics }),
  note: "",
  setNote: note => set({ note }),
  examples: [],
  setExamples: examples => set({ examples }),
  selected: {
    phonetic: null,
    partOfSpeech: null
  },
  setSelected: selected => set({ selected }),
  from: "",
  setFrom: from => set({ from }),
  to: "",
  setTo: to => set({ to })
}))
