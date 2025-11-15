import { ReactNode, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"

import { Loading } from "@/components/Loading"
import { useUserStore } from "@/stores"
import { auth } from "@/config"
import LandingPage from "@/components/LandingPage"

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, fetchUser } = useUserStore()

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUser(user.uid)
      } else {
        useUserStore.getState().logout()
      }
    })

    return () => unsubscriber()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loading />
          <p className="text-gray-600 dark:text-gray-400">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!isLoading && !user) {
    return <LandingPage />
  }

  return children
}

export default AuthProvider
