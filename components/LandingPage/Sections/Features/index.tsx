"use client";

import {
  BookOpenIcon,
  CalendarIcon,
  FlashlightIcon,
  Share2Icon,
  StickyNoteIcon,
  TimerIcon,
} from "lucide-react";
import { motion } from "motion/react";

import Feature from "./Feature";

const features = [
  {
    icon: <FlashlightIcon className="w-8 h-8" />,
    title: "Flashcards Thông Minh",
    description:
      "Hệ thống flashcards với spaced repetition, giúp ghi nhớ kiến thức lâu dài",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <TimerIcon className="w-8 h-8" />,
    title: "Pomodoro Timer",
    description:
      "Kỹ thuật Pomodoro nâng cao năng suất học tập với thông báo thông minh",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <CalendarIcon className="w-8 h-8" />,
    title: "Lịch Học Thông Minh",
    description: "Lập kế hoạch học tập, theo dõi tiến độ và nhắc nhở tự động",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <StickyNoteIcon className="w-8 h-8" />,
    title: "Ghi Chú Đa Dạng",
    description:
      "Ghi chú phong phú với markdown, code highlighting và tìm kiếm thông minh",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <Share2Icon className="w-8 h-8" />,
    title: "Chia Sẻ Tài Liệu",
    description:
      "Chia sẻ flashcards, ghi chú với cộng đồng hoặc nhóm học tập riêng",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: <BookOpenIcon className="w-8 h-8" />,
    title: "Đa Nền Tảng",
    description: "Học mọi lúc, mọi nơi trên web và mobile với sync real-time",
    color: "from-teal-500 to-green-500",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-20 px-4 bg-white dark:bg-slate-800 transition-colors"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
          >
            Mọi thứ bạn cần để
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              học hiệu quả
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Tất cả các công cụ học tập tốt nhất được tích hợp trong một nền tảng
            duy nhất
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
