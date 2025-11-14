"use client"

import { Card, CardBody, Button, Progress } from '@heroui/react'
import { Plus, Calendar as CalendarIcon, Clock, BookOpen, Users } from 'lucide-react'
import DefaultLayout from '@/layouts/DefaultLayout'

export default function CalendarPage() {
    const upcomingEvents = [
        {
            id: 1,
            title: "Ôn tập từ vựng TOEIC",
            time: "09:00 - 10:00",
            date: "Hôm nay",
            type: "study",
            color: "bg-blue-500"
        },
        {
            id: 2,
            title: "Học React Hooks",
            time: "14:00 - 15:30",
            date: "Hôm nay",
            type: "study",
            color: "bg-green-500"
        },
        {
            id: 3,
            title: "Nhóm học tiếng Anh",
            time: "19:00 - 20:30",
            date: "Ngày mai",
            type: "group",
            color: "bg-purple-500"
        },
        {
            id: 4,
            title: "Làm bài tập Toán",
            time: "15:00 - 16:30",
            date: "Thứ 5",
            type: "homework",
            color: "bg-orange-500"
        }
    ]

    const studyStats = [
        { subject: "Tiếng Anh", hours: 12, progress: 75 },
        { subject: "Lập trình", hours: 8, progress: 60 },
        { subject: "Toán học", hours: 6, progress: 45 },
        { subject: "Khoa học", hours: 4, progress: 30 }
    ]

    return (
        <DefaultLayout>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                            Lịch học
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Quản lý thời gian học tập và lịch trình của bạn
                        </p>
                    </div>
                    <Button
                        color="primary"
                        startContent={<Plus className="w-5 h-5" />}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 mt-4 lg:mt-0"
                    >
                        Thêm sự kiện
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Calendar & Events */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Calendar Overview */}
                        <Card>
                            <CardBody className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Tháng 12, 2024
                                    </h2>
                                    <div className="flex gap-2">
                                        <Button variant="light" size="sm">‹</Button>
                                        <Button variant="light" size="sm">Hôm nay</Button>
                                        <Button variant="light" size="sm">›</Button>
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-2 mb-4">
                                    {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                                        <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 py-2">
                                            {day}
                                        </div>
                                    ))}

                                    {/* Calendar days - simplified for demo */}
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                        <div
                                            key={day}
                                            className={`text-center p-3 rounded-lg border-2 transition-all cursor-pointer
                        ${day === 15 ? 'bg-blue-500 text-white border-blue-500' :
                                                    'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Upcoming Events */}
                        <Card>
                            <CardBody className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Sự kiện sắp tới
                                </h2>
                                <div className="space-y-4">
                                    {upcomingEvents.map(event => (
                                        <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                            <div className={`w-3 h-12 rounded-full ${event.color}`}></div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {event.title}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {event.time}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <CalendarIcon className="w-4 h-4" />
                                                        {event.date}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button variant="light" size="sm">
                                                Chi tiết
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Study Statistics */}
                        <Card>
                            <CardBody className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Thống kê học tập
                                </h3>
                                <div className="space-y-4">
                                    {studyStats.map((stat, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600 dark:text-gray-400">{stat.subject}</span>
                                                <span className="font-semibold">{stat.hours}h</span>
                                            </div>

                                            <Progress
                                                value={stat.progress}
                                                className="h-2"
                                                color="primary"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardBody className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Hành động nhanh
                                </h3>
                                <div className="space-y-3">
                                    <Button
                                        variant="bordered"
                                        startContent={<BookOpen className="w-4 h-4" />}
                                        className="w-full justify-start"
                                    >
                                        Tạo lịch ôn tập
                                    </Button>
                                    <Button
                                        variant="bordered"
                                        startContent={<Users className="w-4 h-4" />}
                                        className="w-full justify-start"
                                    >
                                        Lịch học nhóm
                                    </Button>
                                    <Button
                                        variant="bordered"
                                        startContent={<Clock className="w-4 h-4" />}
                                        className="w-full justify-start"
                                    >
                                        Đặt lời nhắc
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Study Goals */}
                        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                            <CardBody className="p-6">
                                <h3 className="font-semibold mb-3">Mục tiêu tuần</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Thời gian học:</span>
                                        <span className="font-semibold">15/20h</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Flashcards:</span>
                                        <span className="font-semibold">45/50 thẻ</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Bài tập:</span>
                                        <span className="font-semibold">8/10 bài</span>
                                    </div>
                                </div>
                                <Progress
                                    value={75}
                                    className="h-2 mt-3"
                                    classNames={{
                                        indicator: "bg-white",
                                        track: "bg-white/30"
                                    }}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}
