import { IDocument } from "./document";

export interface IDesk extends IDocument {
  ownerId: string;

  name: string;
  description: string;

  stats: {
    totalCards: number;
    dueCards: number;
    learnedCards: number;
  };
}
