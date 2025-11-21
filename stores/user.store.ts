import { auth, db } from "@/config";
import { IUser } from "@/interfaces/user";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

interface UserStore {
  user: IUser | null;
  isLoading: boolean;
  fetchUser: (uid: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoading: true,
  fetchUser: async (uid) => {
    const snapshot = await getDoc(doc(db, "users", uid));
    const data = snapshot.data() as IUser;
    set({ user: data, isLoading: false });
  },
  logout: async () => {
    set({ isLoading: true });
    await signOut(auth);
    set({ isLoading: false, user: null });
  },
}));
