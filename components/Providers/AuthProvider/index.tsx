"use client"

import { ReactNode, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter, usePathname } from "next/navigation"

import { Loading } from "@/components/Loading"
import { useUserStore } from "@/stores"
import { auth } from "@/config"

const publicRoutes = ["/"]
const guestOnlyRoutes: string[] = []

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, fetchUser } = useUserStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUser(user.uid)
      } else {
        useUserStore.getState().logout()
      }
    })

    return () => unsubscriber()
  }, [fetchUser])

  useEffect(() => {
    if (!isLoading) {
      if (user && guestOnlyRoutes.includes(pathname)) {
        router.replace("/dashboard")
        return
      }

      if (!user && !publicRoutes.includes(pathname)) {
        router.replace("/")
        return
      }
    }
  }, [user, isLoading, pathname, router])

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

  return children
}

export default AuthProvider
