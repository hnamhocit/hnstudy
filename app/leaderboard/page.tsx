"use client"

import { Card, CardBody, Avatar, Tabs, Tab } from '@heroui/react'
import { Crown, TrendingUp, Target, Users, BookOpen, Award, Star, Zap, Calendar, Clock } from 'lucide-react'
import DefaultLayout from '@/layouts/DefaultLayout'

export default function LeaderboardPage() {
  const leaderboards = {
    mostActive: [
      { id: 1, rank: 1, name: "Nguyễn Văn A", avatar: "/avatars/1.jpg", score: 2847, progress: 95, streak: 42, change: 0 },
      { id: 2, rank: 2, name: "Trần Thị B", avatar: "/avatars/2.jpg", score: 2678, progress: 88, streak: 35, change: 1 },
      { id: 3, rank: 3, name: "Lê Văn C", avatar: "/avatars/3.jpg", score: 2456, progress: 82, streak: 28, change: -1 },
      { id: 4, rank: 4, name: "Phạm Thị D", avatar: "/avatars/4.jpg", score: 2234, progress: 78, streak: 21, change: 2 },
      { id: 5, rank: 5, name: "Hoàng Văn E", avatar: "/avatars/5.jpg", score: 1987, progress: 72, streak: 14, change: 0 }
    ],
    highestAccuracy: [
      { id: 1, rank: 1, name: "Trần Thị B", avatar: "/avatars/2.jpg", accuracy: 98, cards: 1245, streak: 35, change: 0 },
      { id: 2, rank: 2, name: "Nguyễn Văn A", avatar: "/avatars/1.jpg", accuracy: 95, cards: 1567, streak: 42, change: 0 },
      { id: 3, rank: 3, name: "Lê Văn C", avatar: "/avatars/3.jpg", accuracy: 92, cards: 987, streak: 28, change: 1 },
      { id: 4, rank: 4, name: "Phạm Thị D", avatar: "/avatars/4.jpg", accuracy: 89, cards: 765, streak: 21, change: -1 },
      { id: 5, rank: 5, name: "Hoàng Văn E", avatar: "/avatars/5.jpg", accuracy: 85, cards: 654, streak: 14, change: 0 }
    ],
    mostFlashcards: [
      { id: 1, rank: 1, name: "Nguyễn Văn A", avatar: "/avatars/1.jpg", flashcards: 1567, studied: 2847, shared: 45, change: 0 },
      { id: 2, rank: 2, name: "Trần Thị B", avatar: "/avatars/2.jpg", flashcards: 1245, studied: 2678, shared: 38, change: 0 },
      { id: 3, rank: 3, name: "Lê Văn C", avatar: "/avatars/3.jpg", flashcards: 987, studied: 2456, shared: 32, change: 1 },
      { id: 4, rank: 4, name: "Phạm Thị D", avatar: "/avatars/4.jpg", flashcards: 765, studied: 2234, shared: 28, change: -1 },
      { id: 5, rank: 5, name: "Hoàng Văn E", avatar: "/avatars/5.jpg", flashcards: 654, studied: 1987, shared: 25, change: 0 }
    ],
    knowledgeSharing: [
      { id: 1, rank: 1, name: "Lê Văn C", avatar: "/avatars/3.jpg", posts: 32, likes: 456, shares: 89, followers: 123, change: 2 },
      { id: 2, rank: 2, name: "Nguyễn Văn A", avatar: "/avatars/1.jpg", posts: 45, likes: 423, shares: 76, followers: 156, change: -1 },
      { id: 3, rank: 3, name: "Trần Thị B", avatar: "/avatars/2.jpg", posts: 38, likes: 398, shares: 67, followers: 134, change: -1 },
      { id: 4, rank: 4, name: "Phạm Thị D", avatar: "/avatars/4.jpg", posts: 28, likes: 234, shares: 45, followers: 98, change: 0 },
      { id: 5, rank: 5, name: "Hoàng Văn E", avatar: "/avatars/5.jpg", posts: 25, likes: 198, shares: 32, followers: 76, change: 1 }
    ]
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />
    if (rank === 2) return <Award className="w-6 h-6 text-gray-400 fill-gray-400" />
    if (rank === 3) return <Award className="w-6 h-6 text-orange-500 fill-orange-500" />
    return <span className="text-lg font-bold text-gray-500">#{rank}</span>
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (change < 0) return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
    return <span className="w-4 h-4">-</span>
  }

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Bảng Xếp Hạng
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Cùng thi đua học tập và chia sẻ kiến thức với cộng đồng
          </p>
        </div>

        <Tabs
          aria-label="Leaderboard types"
          classNames={{
            tabList: "grid grid-cols-2 lg:grid-cols-4 w-full",
            tab: "text-sm font-medium"
          }}
        >
          {/* Most Active */}
          <Tab key="active" title={
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Hoạt động</span>
            </div>
          }>
            <Card>
              <CardBody className="p-6">
                <div className="space-y-4">
                  {leaderboards.mostActive.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-10">
                          {getRankBadge(user.rank)}
                        </div>

                        <Avatar src={user.avatar} className="w-12 h-12" />

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </h3>
                            {getChangeIcon(user.change)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {user.score} điểm
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {user.streak} ngày
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {user.progress}%
                        </div>
                        <div className="text-sm text-gray-500">Tiến độ</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>

          {/* Highest Accuracy */}
          <Tab key="accuracy" title={
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Độ chính xác</span>
            </div>
          }>
            <Card>
              <CardBody className="p-6">
                <div className="space-y-4">
                  {leaderboards.highestAccuracy.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-all">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-10">
                          {getRankBadge(user.rank)}
                        </div>

                        <Avatar src={user.avatar} className="w-12 h-12" />

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </h3>
                            {getChangeIcon(user.change)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {user.cards} thẻ
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {user.streak} ngày
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">
                          {user.accuracy}%
                        </div>
                        <div className="text-sm text-gray-500">Chính xác</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>

          {/* Most Flashcards */}
          <Tab key="flashcards" title={
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Flashcards</span>
            </div>
          }>
            <Card>
              <CardBody className="p-6">
                <div className="space-y-4">
                  {leaderboards.mostFlashcards.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-all">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-10">
                          {getRankBadge(user.rank)}
                        </div>

                        <Avatar src={user.avatar} className="w-12 h-12" />

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </h3>
                            {getChangeIcon(user.change)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {user.studied} đã học
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {user.shared} chia sẻ
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {user.flashcards}
                        </div>
                        <div className="text-sm text-gray-500">Flashcards</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>

          {/* Knowledge Sharing */}
          <Tab key="sharing" title={
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Chia sẻ</span>
            </div>
          }>
            <Card>
              <CardBody className="p-6">
                <div className="space-y-4">
                  {leaderboards.knowledgeSharing.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800 transition-all">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-10">
                          {getRankBadge(user.rank)}
                        </div>

                        <Avatar src={user.avatar} className="w-12 h-12" />

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </h3>
                            {getChangeIcon(user.change)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{user.posts} bài viết</span>
                            <span>♥ {user.likes} likes</span>
                            <span>{user.followers} followers</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                          {user.shares}
                        </div>
                        <div className="text-sm text-gray-500">Chia sẻ</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>

        {/* User Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardBody className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm opacity-90">Người dùng tích cực</div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardBody className="p-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">45,678</div>
              <div className="text-sm opacity-90">Flashcards</div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardBody className="p-6 text-center">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">87%</div>
              <div className="text-sm opacity-90">Độ chính xác TB</div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardBody className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">2,456h</div>
              <div className="text-sm opacity-90">Thời gian học</div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  )
}
