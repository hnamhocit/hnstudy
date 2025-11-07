import { ReactNode, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"

import { Loading } from "@/components/Loading"
import { useUserStore } from "@/stores"
import Form from "../Form"
import { auth, db } from "@/config"
import { doc, getDoc } from "firebase/firestore"
import { IUser } from "@/interfaces/user"

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, fetchUser } = useUserStore()

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      if (user) {
        fetchUser(user.uid)
      }
    })

    return () => unsubscriber()
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>
  }

  if (!user) {
    return <Form />
  }

  return children
}

export default AuthProvider 
