"use client";

import { Button } from "@heroui/react";
import { ArrowRightIcon, PlayIcon, Star } from "lucide-react";
import { motion, Variants } from "motion/react";

import Stat from "./Stat";

const stats = [
  { number: "10K+", label: "Người dùng" },
  { number: "50K+", label: "Flashcards" },
  { number: "95%", label: "Hiệu quả học tập" },
  { number: "24/7", label: "Hỗ trợ" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default">
              <Star className="w-4 h-4" />
              <span>Nền tảng học tập toàn diện nhất 2024</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Học tập
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Thông Minh
            </span>
            <br />
            Kết quả
            <span className="bg-linear-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              {" "}
              Vượt Trội
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Kết hợp flashcards, pomodoro, lịch học và ghi chú trong một nền tảng
            duy nhất. Tối ưu hóa quá trình học tập của bạn với AI và khoa học
            nhận thức.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-8 py-6 text-lg shadow-lg shadow-purple-500/20"
                endContent={<ArrowRightIcon className="w-5 h-5" />}
              >
                Bắt đầu học ngay
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="bordered"
                className="px-8 py-6 text-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                startContent={<PlayIcon className="w-5 h-5" />}
              >
                Xem demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="hover:scale-105 transition-transform duration-300"
              >
                <Stat {...stat} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
