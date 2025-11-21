"use client";

import { Card, CardBody, Button } from "@heroui/react";
import {
  Flashlight,
  Timer,
  Calendar,
  StickyNote,
  Plus,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Heart,
  MessageCircle,
} from "lucide-react";
import { motion, Variants } from "motion/react";
import DefaultLayout from "@/layouts/DefaultLayout";
import clsx from "clsx";

const stats = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    value: "12",
    label: "Bộ flashcards",
    color: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/30",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: "85%",
    label: "Độ chính xác",
    color: "from-green-500 to-emerald-500",
    shadow: "shadow-green-500/30",
  },
  {
    icon: <Timer className="w-6 h-6" />,
    value: "25h",
    label: "Thời gian học",
    color: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/30",
  },
  {
    icon: <StickyNote className="w-6 h-6" />,
    value: "8",
    label: "Ghi chú",
    color: "from-orange-500 to-red-500",
    shadow: "shadow-orange-500/30",
  },
];

const features = [
  {
    icon: <Flashlight className="w-7 h-7" />,
    title: "Flashcards",
    description: "Học với hệ thống thẻ thông minh và spaced repetition",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    href: "/translator",
  },
  {
    icon: <Timer className="w-7 h-7" />,
    title: "Pomodoro",
    description: "Quản lý thời gian học tập hiệu quả với kỹ thuật Pomodoro",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
    href: "/pomodoro",
  },
  {
    icon: <Calendar className="w-7 h-7" />,
    title: "Lịch học",
    description: "Lập kế hoạch học tập và theo dõi tiến độ",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
    href: "/calendar",
  },
  {
    icon: <StickyNote className="w-7 h-7" />,
    title: "Ghi chú",
    description: "Ghi chú thông minh với markdown và tìm kiếm",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-400",
    href: "/notes",
  },
];

const recentPosts = [
  {
    id: 1,
    title: "Cách học từ vựng hiệu quả với Spaced Repetition",
    content:
      "Khám phá phương pháp ghi nhớ từ vựng lâu dài với kỹ thuật lặp lại ngắt quãng...",
    author: "Admin",
    role: "Moderator",
    likes: 24,
    comments: 8,
    initials: "AD",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Pomodoro Technique - Tối ưu hóa thời gian học tập",
    content:
      "Hướng dẫn chi tiết cách sử dụng kỹ thuật Pomodoro để học tập hiệu quả hơn...",
    author: "Study Expert",
    role: "Teacher",
    likes: 18,
    comments: 5,
    initials: "SE",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 3,
    title: "Tạo flashcards thông minh cho môn Lập trình",
    content:
      "Mẹo và chiến lược tạo flashcards hiệu quả cho các khái niệm lập trình...",
    author: "Tech Mentor",
    role: "Mentor",
    likes: 32,
    comments: 12,
    initials: "TM",
    color: "bg-orange-100 text-orange-600",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Dashboard() {
  return (
    <DefaultLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div
          variants={itemVariants}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Chào mừng trở lại! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            Sẵn sàng cho một ngày học tập hiệu quả? Hãy bắt đầu với các công cụ
            bên dưới.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Card
                className={clsx(
                  "bg-linear-to-br text-white border-none",
                  stat.color,
                  stat.shadow,
                  "shadow-lg",
                )}
              >
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/10">
                      {stat.icon}
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-bold tracking-tight">
                        {stat.value}
                      </div>

                      <div className="text-sm font-medium opacity-90">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            variants={containerVariants}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Flashlight className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                Công cụ học tập
              </h2>
              <Button
                color="primary"
                variant="light"
                className="font-medium"
                endContent={<ArrowRight className="w-4 h-4" />}
              >
                Xem tất cả
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    isPressable
                    onPress={() => (window.location.href = feature.href)}
                    className="group border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-300 h-full w-full"
                  >
                    <CardBody className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={clsx(
                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300",
                            feature.bg,
                            feature.text,
                          )}
                        >
                          {feature.icon}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Bài viết nổi bật
              </h2>
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </motion.div>

            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 border border-transparent transition-all duration-300 bg-white dark:bg-slate-800">
                    <CardBody className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                            post.color,
                          )}
                        >
                          {post.initials}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-900 dark:text-white">
                            {post.author}
                          </div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                            {post.role}
                          </div>
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer group">
                            <Heart className="w-3.5 h-3.5 group-hover:fill-red-500" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer group">
                            <MessageCircle className="w-3.5 h-3.5 group-hover:fill-blue-500" />
                            {post.comments}
                          </span>
                        </div>
                        <span className="text-xs">2 giờ trước</span>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <Card className="bg-linear-to-br from-blue-600 to-purple-700 text-white shadow-lg shadow-purple-500/20 border-none overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                <CardBody className="p-6 text-center relative z-10">
                  <h3 className="font-bold text-lg mb-1">Cộng đồng hnstudy</h3>
                  <p className="text-blue-100 text-sm mb-6">
                    Cùng nhau tiến bộ mỗi ngày
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                      <div className="text-lg font-bold">1.2K</div>
                      <div className="text-[10px] opacity-80 uppercase tracking-wider">
                        Members
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                      <div className="text-lg font-bold">500+</div>
                      <div className="text-[10px] opacity-80 uppercase tracking-wider">
                        Posts
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                      <div className="text-lg font-bold">98%</div>
                      <div className="text-[10px] opacity-80 uppercase tracking-wider">
                        Happy
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-white text-blue-600 font-bold shadow-md"
                    size="sm"
                  >
                    Tham gia ngay
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </DefaultLayout>
  );
}
