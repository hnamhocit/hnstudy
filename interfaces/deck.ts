import { IDocument } from "./document";

export interface IDeck extends IDocument {
  name: string;
  description: string;
  userId: string
  wordCount: number
  isPublic: boolean
}
