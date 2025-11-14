"use client"

import { useState, useEffect } from 'react'
import { Button, Image, useDisclosure } from "@heroui/react"
import {
    Flashlight,
    Timer,
    Calendar,
    StickyNote,
    Share2,
    BookOpen,
    ArrowRight,
    Play,
    Star,
    User
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useUserStore } from '@/stores'
import AuthModal from '@/components/AuthModal'

export default function LandingPage() {
    const [isVisible, setIsVisible] = useState(false)
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    const { user } = useUserStore()
    const router = useRouter()

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleGetStarted = () => {
        if (user) {
            router.push('/dashboard')
        } else {
            onOpen()
        }
    }

    const features = [
        {
            icon: <Flashlight className="w-8 h-8" />,
            title: "Flashcards Thông Minh",
            description: "Hệ thống flashcards với spaced repetition, giúp ghi nhớ kiến thức lâu dài",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Timer className="w-8 h-8" />,
            title: "Pomodoro Timer",
            description: "Kỹ thuật Pomodoro nâng cao năng suất học tập với thông báo thông minh",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Lịch Học Thông Minh",
            description: "Lập kế hoạch học tập, theo dõi tiến độ và nhắc nhở tự động",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <StickyNote className="w-8 h-8" />,
            title: "Ghi Chú Đa Dạng",
            description: "Ghi chú phong phú với markdown, code highlighting và tìm kiếm thông minh",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: <Share2 className="w-8 h-8" />,
            title: "Chia Sẻ Tài Liệu",
            description: "Chia sẻ flashcards, ghi chú với cộng đồng hoặc nhóm học tập riêng",
            color: "from-indigo-500 to-blue-500"
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Đa Nền Tảng",
            description: "Học mọi lúc, mọi nơi trên web và mobile với sync real-time",
            color: "from-teal-500 to-green-500"
        }
    ]

    const stats = [
        { number: "10K+", label: "Người dùng" },
        { number: "50K+", label: "Flashcards" },
        { number: "95%", label: "Hiệu quả học tập" },
        { number: "24/7", label: "Hỗ trợ" }
    ]

    const testimonials = [
        {
            name: "Minh Anh",
            role: "Sinh viên Đại học",
            content: "Ứng dụng đã thay đổi hoàn toàn cách học của mình. Từ 5.0 lên 8.5 chỉ sau 2 tháng!",
            avatar: "MA"
        },
        {
            name: "Tuấn Nguyễn",
            role: "Developer",
            content: "Pomodoro + Flashcards là combo hoàn hảo để học coding. Highly recommended!",
            avatar: "TN"
        },
        {
            name: "Hương Giang",
            role: "Marketing Manager",
            content: "Duy trì thói quen học tiếng Anh mỗi ngày chưa bao giờ dễ dàng đến thế.",
            avatar: "HG"
        }
    ]

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 transition-colors">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-slate-700">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image src='/logo.jpg' alt='Logo' width={40} height={40} radius='full' />
                            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                hnstudy
                            </span>
                        </div>

                        <div className="flex items-center space-x-4">
                            {user ? (
                                <Button
                                    onPress={() => router.push('/dashboard')}
                                    startContent={<User className="w-4 h-4" />}
                                    className="bg-linear-to-r from-blue-500 to-purple-600 text-white"
                                >
                                    Dashboard
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="light"
                                        className="hidden sm:flex dark:text-gray-300"
                                        onPress={onOpen}
                                    >
                                        Đăng nhập
                                    </Button>

                                    <Button
                                        color="primary"
                                        className="bg-gradient-to-r from-blue-500 to-purple-600"
                                        onPress={onOpen}
                                    >
                                        Bắt đầu miễn phí
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                        <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                            <Star className="w-4 h-4" />
                            <span>Nền tảng học tập toàn diện nhất 2024</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Học tập
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Thông Minh</span>
                            <br />
                            Kết quả
                            <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent"> Vượt Trội</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Kết hợp flashcards, pomodoro, lịch học và ghi chú trong một nền tảng duy nhất.
                            Tối ưu hóa quá trình học tập của bạn với AI và khoa học nhận thức.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-6 text-lg hover:shadow-lg transition-all"
                                endContent={<ArrowRight className="w-5 h-5" />}
                                onPress={handleGetStarted}
                            >
                                Bắt đầu học ngay
                            </Button>

                            <Button
                                size="lg"
                                variant="bordered"
                                className="px-8 py-6 text-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                                startContent={<Play className="w-5 h-5" />}
                            >
                                Xem demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                                    <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 bg-white dark:bg-slate-800 transition-colors">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Mọi thứ bạn cần để
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> học hiệu quả</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Tất cả các công cụ học tập tốt nhất được tích hợp trong một nền tảng duy nhất
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group p-8 rounded-2xl border-2 border-transparent bg-gradient-to-br ${feature.color} bg-opacity-5 dark:bg-opacity-10 hover:bg-opacity-10 dark:hover:bg-opacity-20 transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-700`}
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 transition-colors">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Được tin dùng bởi
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> hàng ngàn người học</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                                        <div className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">"{testimonial.content}"</p>
                                <div className="flex space-x-1 mt-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Sẵn sàng thay đổi cách học?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Tham gia cùng hàng ngàn người học thông minh ngay hôm nay. Hoàn toàn miễn phí!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            className="bg-white text-blue-600 px-8 py-6 text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200"
                        >
                            Tạo tài khoản miễn phí
                        </Button>
                        <Button
                            size="lg"
                            variant="bordered"
                            className="border-white text-white px-8 py-6 text-lg hover:bg-white/10"
                        >
                            Tìm hiểu thêm
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12 px-4 transition-colors">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
                            <span className="text-xl font-bold">StudyFlow</span>
                        </div>
                        <div className="flex space-x-6 text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
                            <a href="#" className="hover:text-white transition-colors">Bảo mật</a>
                            <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
                        </div>
                    </div>
                    <div className="text-center text-gray-500 mt-8">
                        © 2025 hnstudy. All rights reserved.
                    </div>
                </div>
            </footer>

            <AuthModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </div>
    )
}
