"use client"

import { useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Image, Tab, Tabs } from "@heroui/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth"
import { auth, db } from "@/config"
import { doc, getDoc, setDoc } from "firebase/firestore"

const loginSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
})

const registerSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: z.string(),
  username: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
})

type LoginFormInputs = z.infer<typeof loginSchema>
type RegisterFormInputs = z.infer<typeof registerSchema>

interface AuthModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const AuthModal = ({ isOpen, onOpenChange }: AuthModalProps) => {
  const [selectedTab, setSelectedTab] = useState("login")
  const [firebaseError, setFirebaseError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loginForm = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const registerForm = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: ""
    }
  })

  const createUserDocument = async (user: User, username?: string) => {
    const userDocRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(userDocRef)

    if (!docSnap.exists()) {
      const userUsername = username || user.displayName || user.email!.split('@')[0]
      const date = Date.now()

      await setDoc(userDocRef, {
        id: user.uid,
        email: user.email,
        username: userUsername,
        photoURL: user.photoURL || null,
        createdAt: date,
        updatedAt: date,
      })
    }
  }

  const onLoginSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setFirebaseError(null)
    setIsLoading(true)

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      onOpenChange(false)
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setFirebaseError("Tài khoản không tồn tại")
      } else if (error.code === 'auth/wrong-password') {
        setFirebaseError("Sai mật khẩu")
      } else {
        setFirebaseError("Đăng nhập thất bại")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onRegisterSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setFirebaseError(null)
    setIsLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await createUserDocument(userCredential.user, data.username)
      window.location.reload()
      onOpenChange(false)
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setFirebaseError("Email đã được sử dụng")
      } else {
        setFirebaseError("Đăng ký thất bại")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleAuthWithGoogle = async () => {
    setFirebaseError(null)
    setIsLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      await createUserDocument(result.user)
      onOpenChange(false)
    } catch (error: any) {
      setFirebaseError("Đăng nhập Google thất bại")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForms = () => {
    setFirebaseError(null)
    loginForm.reset()
    registerForm.reset()
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open)
        if (!open) resetForms()
      }}
      size="md"
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            hnstudy
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Học tập thông minh, kết quả vượt trội
          </p>
        </ModalHeader>

        <ModalBody className="pb-6">
          <Tabs
            aria-label="Auth options"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            classNames={{
              tabList: "grid grid-cols-2 w-full",
              tab: "text-sm font-medium"
            }}
          >
            <Tab key="login" title="Đăng nhập">
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <Input
                  label="Email"
                  variant="bordered"
                  isInvalid={!!loginForm.formState.errors.email}
                  errorMessage={loginForm.formState.errors.email?.message}
                  {...loginForm.register("email")}
                />

                <Input
                  label="Mật khẩu"
                  variant="bordered"
                  type="password"
                  isInvalid={!!loginForm.formState.errors.password}
                  errorMessage={loginForm.formState.errors.password?.message}
                  {...loginForm.register("password")}
                />

                {firebaseError && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
                    {firebaseError}
                  </div>
                )}

                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  isLoading={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Đăng nhập
                </Button>
              </form>
            </Tab>

            <Tab key="register" title="Đăng ký">
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <Input
                  label="Tên người dùng"
                  variant="bordered"
                  isInvalid={!!registerForm.formState.errors.username}
                  errorMessage={registerForm.formState.errors.username?.message}
                  {...registerForm.register("username")}
                />

                <Input
                  label="Email"
                  variant="bordered"
                  isInvalid={!!registerForm.formState.errors.email}
                  errorMessage={registerForm.formState.errors.email?.message}
                  {...registerForm.register("email")}
                />

                <Input
                  label="Mật khẩu"
                  variant="bordered"
                  type="password"
                  isInvalid={!!registerForm.formState.errors.password}
                  errorMessage={registerForm.formState.errors.password?.message}
                  {...registerForm.register("password")}
                />

                <Input
                  label="Xác nhận mật khẩu"
                  variant="bordered"
                  type="password"
                  isInvalid={!!registerForm.formState.errors.confirmPassword}
                  errorMessage={registerForm.formState.errors.confirmPassword?.message}
                  {...registerForm.register("confirmPassword")}
                />

                {firebaseError && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
                    {firebaseError}
                  </div>
                )}

                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  isLoading={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Đăng ký
                </Button>
              </form>
            </Tab>
          </Tabs>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-sm text-gray-500 dark:text-gray-400">hoặc</div>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          <Button
            onPress={handleAuthWithGoogle}
            startContent={
              <Image
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google"
                width={20}
                height={20}
              />
            }
            fullWidth
            variant="bordered"
            isLoading={isLoading}
          >
            Tiếp tục với Google
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AuthModal
