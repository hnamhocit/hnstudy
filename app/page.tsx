"use client"

import { Card, CardBody, Button } from '@heroui/react'
import {
    Flashlight,
    Timer,
    Calendar,
    StickyNote,
    Plus,
    BookOpen,
    TrendingUp,
    Users,
    FileText
} from 'lucide-react'
import DefaultLayout from '@/layouts/DefaultLayout'
import clsx from 'clsx'
import Image from 'next/image'

export default function Dashboard() {
    // Hard-coded stats data
    const stats = [
        {
            icon: <BookOpen className="w-8 h-8" />,
            value: "12",
            label: "Bộ flashcards",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            value: "85%",
            label: "Độ chính xác",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <Timer className="w-8 h-8" />,
            value: "25h",
            label: "Thời gian học",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <StickyNote className="w-8 h-8" />,
            value: "8",
            label: "Ghi chú",
            color: "from-orange-500 to-red-500"
        }
    ]

    // Hard-coded features data
    const features = [
        {
            icon: <Flashlight className="w-8 h-8" />,
            title: "Flashcards",
            description: "Học với hệ thống thẻ thông minh và spaced repetition",
            color: "from-blue-500 to-cyan-500",
            href: "/flashcards"
        },
        {
            icon: <Timer className="w-8 h-8" />,
            title: "Pomodoro",
            description: "Quản lý thời gian học tập hiệu quả với kỹ thuật Pomodoro",
            color: "from-green-500 to-emerald-500",
            href: "/pomodoro"
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Lịch học",
            description: "Lập kế hoạch học tập và theo dõi tiến độ",
            color: "from-purple-500 to-pink-500",
            href: "/calendar"
        },
        {
            icon: <StickyNote className="w-8 h-8" />,
            title: "Ghi chú",
            description: "Ghi chú thông minh với markdown và tìm kiếm",
            color: "from-orange-500 to-red-500",
            href: "/notes"
        }
    ]

    // Hard-coded recent posts data
    const recentPosts = [
        {
            id: 1,
            title: "Cách học từ vựng hiệu quả với Spaced Repetition",
            content: "Khám phá phương pháp ghi nhớ từ vựng lâu dài với kỹ thuật lặp lại ngắt quãng...",
            author: "Admin",
            likes: 24,
            comments: 8
        },
        {
            id: 2,
            title: "Pomodoro Technique - Tối ưu hóa thời gian học tập",
            content: "Hướng dẫn chi tiết cách sử dụng kỹ thuật Pomodoro để học tập hiệu quả hơn...",
            author: "Study Expert",
            likes: 18,
            comments: 5
        },
        {
            id: 3,
            title: "Tạo flashcards thông minh cho môn Lập trình",
            content: "Mẹo và chiến lược tạo flashcards hiệu quả cho các khái niệm lập trình...",
            author: "Tech Mentor",
            likes: 32,
            comments: 12
        }
    ]

    return (
        <DefaultLayout>
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Chào mừng trở lại! 👋
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                        Sẵn sàng cho một ngày học tập hiệu quả? Hãy bắt đầu với các công cụ bên dưới.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className={clsx("bg-linear-to-r text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105", stat.color)}
                        >
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <div className="text-sm opacity-90">{stat.label}</div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Features Grid */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Công cụ học tập
                            </h2>
                            <Button
                                color="primary"
                                variant="light"
                                className="text-blue-600 dark:text-blue-400"
                            >
                                Xem tất cả
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <Card
                                    key={index}
                                    isPressable
                                    onPress={() => window.location.href = feature.href}
                                    className="group border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300"
                                >
                                    <CardBody className="p-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                                                Khám phá ngay →
                                            </span>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Recent Posts Sidebar */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Bài viết nổi bật
                            </h2>
                            <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                                className="text-gray-600 dark:text-gray-400"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {recentPosts.map((post) => (
                                <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                                    <CardBody className="p-5">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3 leading-relaxed">
                                            {post.content}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {post.author}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FileText className="w-3 h-3" />
                                                    {post.comments} comments
                                                </span>
                                            </div>
                                            <span className="text-orange-500 font-medium">
                                                {post.likes} likes
                                            </span>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        {/* Community Stats */}
                        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <CardBody className="p-6 text-center">
                                <h3 className="font-semibold mb-2">Cộng đồng hnstudy</h3>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <div className="text-lg font-bold">1.2K+</div>
                                        <div className="opacity-90">Thành viên</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold">500+</div>
                                        <div className="opacity-90">Bài viết</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold">95%</div>
                                        <div className="opacity-90">Hài lòng</div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}
