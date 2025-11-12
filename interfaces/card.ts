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

  nextReviewDate: Date;
  interval: number;
  easeFactor: number;
  repetitions: number;
}
