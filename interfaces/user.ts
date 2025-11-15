import { IDocument } from "./document";

export interface IUser extends IDocument {
  email: string
  photoURL: string | null
  username: string
}
