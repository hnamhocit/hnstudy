import { IDocument } from "./document";

export interface INote extends IDocument {
  title: string
  content: string
  tags: string[]
  isPinned: boolean
  category: string
  userId: string
}
