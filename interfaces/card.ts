import { IDocument } from "./document";

export interface IExample {
  from: string
  to: string
}

export type CardStatus = 'new' | 'learning' | 'learned' | 'review'

export interface ICard extends IDocument {
  id: string;
  deckId: string;

  front: string;
  phonetic: string
  audio: string
  sourceUrl: string
  pos: string
  definition: string
  note: string
  examples: IExample[]

  // Spaced Repetition System (SRS)
  status: CardStatus
  nextReviewDate: Date
  interval: number
  easeFactor: number
  repetitions: number

  // Stats
  lastReviewed?: Date
  correctCount: number
  wrongCount: number
  streak: number
}
