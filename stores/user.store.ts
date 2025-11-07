import { db } from "@/config";
import { IUser } from "@/interfaces/user";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";


interface UserStore {
  user: IUser | null
  isLoading: boolean,
  fetchUser: (uid: string) => Promise<void>
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoading: false,
  fetchUser: async (uid) => {
    set({ isLoading: true })
    const snapshot = await getDoc(doc(db, "users", uid))
    const data = snapshot.data() as IUser
    set({ user: data, isLoading: false })
  }
}))
