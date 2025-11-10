import { IDocument } from "./document";

export interface IDeck extends IDocument {
  name: string;
  description: string;
  userId: string
  wordCount: number
  isPublic: boolean

  stats: {
    new: number
    learning: number
    learned: number
  };

  lastSessionAccuracy: number
  lastSessionDate: Date
}
