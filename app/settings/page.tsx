"use client"

import { useState } from 'react'
import { Card, CardBody, Button, Input, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Divider } from '@heroui/react'
import { LogOut, Trash2, User, Shield, Bell, Globe, CreditCard, HelpCircle } from 'lucide-react'
import DefaultLayout from '@/layouts/DefaultLayout'
import { useUserStore } from '@/stores'
import { auth, db } from '@/config'
import { signOut, deleteUser, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { doc, deleteDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const { user, logout } = useUserStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [reauthenticatePassword, setReauthenticatePassword] = useState('')

  // Form states
  const [profileData, setProfileData] = useState({
    displayName: user?.username || '',
    email: user?.email || '',
    photoURL: user?.photoURL || ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut(auth)
      logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
      setIsLogoutModalOpen(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!user || !reauthenticatePassword) return

    try {
      setIsLoading(true)

      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, reauthenticatePassword)
      await reauthenticateWithCredential(auth.currentUser!, credential)

      // Delete user data from Firestore
      await deleteDoc(doc(db, 'users', user.id))

      // Delete user from Authentication
      await deleteUser(auth.currentUser!)

      logout()
      router.push('/')
    } catch (error: any) {
      console.error('Delete account error:', error)
      alert(error.message)
    } finally {
      setIsLoading(false)
      setIsDeleteModalOpen(false)
      setReauthenticatePassword('')
    }
  }

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return

    try {
      setIsLoading(true)

      // Update profile in Authentication
      await updateProfile(auth.currentUser, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL
      })

      // Here you would also update Firestore
      // await updateDoc(doc(db, 'users', user.id), {
      //   username: profileData.displayName,
      //   photoURL: profileData.photoURL,
      //   updatedAt: serverTimestamp()
      // })

      alert('Cập nhật hồ sơ thành công!')
    } catch (error: any) {
      console.error('Update profile error:', error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (!auth.currentUser || passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Mật khẩu mới không khớp!')
      return
    }

    try {
      setIsLoading(true)
      await updatePassword(auth.currentUser, passwordData.newPassword)
      alert('Cập nhật mật khẩu thành công!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error: any) {
      console.error('Update password error:', error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const menuItems = [
    { id: 'profile', label: 'Hồ sơ', icon: <User className="w-5 h-5" /> },
    { id: 'security', label: 'Bảo mật', icon: <Shield className="w-5 h-5" /> },
    { id: 'notifications', label: 'Thông báo', icon: <Bell className="w-5 h-5" /> },
    { id: 'preferences', label: 'Tùy chọn', icon: <Globe className="w-5 h-5" /> },
    { id: 'billing', label: 'Thanh toán', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'help', label: 'Trợ giúp', icon: <HelpCircle className="w-5 h-5" /> }
  ]

  return (
    <DefaultLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Cài đặt
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Quản lý tài khoản và tùy chỉnh trải nghiệm của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <Card>
              <CardBody className="p-6">
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeSection === item.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>

                <Divider className="my-6" />

                {/* Danger Zone */}
                <div className="space-y-3">
                  <Button
                    variant="light"
                    startContent={<LogOut className="w-5 h-5" />}
                    onPress={() => setIsLogoutModalOpen(true)}
                    className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Đăng xuất
                  </Button>

                  <Button
                    variant="light"
                    startContent={<Trash2 className="w-5 h-5" />}
                    onPress={() => setIsDeleteModalOpen(true)}
                    className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Xóa tài khoản
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Hồ sơ cá nhân
                  </h2>

                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Avatar Section */}
                    <div className="lg:w-1/3">
                      <div className="text-center">
                        <Avatar
                          src={profileData.photoURL || '/default-avatar.png'}
                          className="w-32 h-32 mx-auto mb-4"
                        />
                        <Input
                          label="URL ảnh đại diện"
                          value={profileData.photoURL}
                          onChange={(e) => setProfileData(prev => ({ ...prev, photoURL: e.target.value }))}
                          variant="bordered"
                          className="mb-4"
                        />
                        <Button variant="light" size="sm">
                          Tải ảnh lên
                        </Button>
                      </div>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:w-2/3 space-y-4">
                      <Input
                        label="Tên hiển thị"
                        value={profileData.displayName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                        variant="bordered"
                      />

                      <Input
                        label="Email"
                        value={profileData.email}
                        disabled
                        variant="bordered"
                        description="Email không thể thay đổi"
                      />

                      <Input
                        label="User ID"
                        value={user?.id || ''}
                        disabled
                        variant="bordered"
                      />

                      <div className="flex gap-3 pt-4">
                        <Button
                          color="primary"
                          onPress={handleUpdateProfile}
                          isLoading={isLoading}
                          className="bg-gradient-to-r from-blue-500 to-purple-600"
                        >
                          Cập nhật hồ sơ
                        </Button>
                        <Button variant="light">
                          Hủy
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Bảo mật
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Đổi mật khẩu
                      </h3>

                      <div className="space-y-4 max-w-md">
                        <Input
                          label="Mật khẩu hiện tại"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          variant="bordered"
                        />

                        <Input
                          label="Mật khẩu mới"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          variant="bordered"
                        />

                        <Input
                          label="Xác nhận mật khẩu mới"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          variant="bordered"
                        />

                        <Button
                          color="primary"
                          onPress={handleUpdatePassword}
                          isLoading={isLoading}
                          className="bg-gradient-to-r from-blue-500 to-purple-600"
                        >
                          Cập nhật mật khẩu
                        </Button>
                      </div>
                    </div>

                    <Divider />

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Phiên đăng nhập
                      </h3>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                          Bạn đang đăng nhập từ trình duyệt này. Đăng xuất sẽ kết thúc tất cả phiên đăng nhập.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Other sections can be added similarly */}
            {activeSection === 'notifications' && (
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Cài đặt thông báo
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tính năng đang được phát triển...
                  </p>
                </CardBody>
              </Card>
            )}

            {/* Add more sections as needed */}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal isOpen={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <ModalContent>
          <ModalHeader>Xác nhận đăng xuất</ModalHeader>
          <ModalBody>
            <p>Bạn có chắc chắn muốn đăng xuất?</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setIsLogoutModalOpen(false)}>
              Hủy
            </Button>
            <Button color="danger" onPress={handleSignOut} isLoading={isLoading}>
              Đăng xuất
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Account Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <ModalContent>
          <ModalHeader>Xóa tài khoản</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p className="text-red-600 dark:text-red-400 font-semibold">
                Cảnh báo: Hành động này không thể hoàn tác!
              </p>
              <p>
                Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn. Bạn sẽ mất quyền truy cập vào tất cả flashcards, ghi chú và lịch sử học tập.
              </p>
              <Input
                label="Nhập mật khẩu để xác nhận"
                type="password"
                value={reauthenticatePassword}
                onChange={(e) => setReauthenticatePassword(e.target.value)}
                variant="bordered"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setIsDeleteModalOpen(false)}>
              Hủy
            </Button>
            <Button
              color="danger"
              onPress={handleDeleteAccount}
              isLoading={isLoading}
              isDisabled={!reauthenticatePassword}
            >
              Xóa tài khoản
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DefaultLayout>
  )
}
