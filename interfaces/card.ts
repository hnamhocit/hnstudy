import { IDocument } from "./document";

export interface IExample {
  from: string
  to: string
}

export interface ICard extends IDocument {
  id: string;
  deckId: string;

  front: string;
  back: string;
  phonetic: string
  audio: string
  sourceUrl: string
  pos: string
  definition: string
  note: string
  examples: IExample[]

  // Spaced Repetition System (SRS)
  status: 'new' | 'learning' | 'learned' | 'review'
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
