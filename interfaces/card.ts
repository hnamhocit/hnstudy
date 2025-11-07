import { IDocument } from "./document";

export interface ICard extends IDocument {
  id: string;
  deckId: string;

  front: string;
  back: string;

  nextReviewDate: Date;
  interval: number;
  easeFactor: number;
  repetitions: number;
}
