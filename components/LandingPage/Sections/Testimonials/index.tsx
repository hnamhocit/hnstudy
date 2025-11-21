"use client";

import { motion } from "motion/react";
import Testimonial from "./Testimonial";

const testimonials = [
  {
    name: "Minh Anh",
    role: "Sinh viên Đại học",
    content:
      "Ứng dụng đã thay đổi hoàn toàn cách học của mình. Từ 5.0 lên 8.5 chỉ sau 2 tháng!",
    avatar: "MA",
  },
  {
    name: "Tuấn Nguyễn",
    role: "Developer",
    content:
      "Pomodoro + Flashcards là combo hoàn hảo để học coding. Highly recommended!",
    avatar: "TN",
  },
  {
    name: "Hương Giang",
    role: "Marketing Manager",
    content:
      "Duy trì thói quen học tiếng Anh mỗi ngày chưa bao giờ dễ dàng đến thế.",
    avatar: "HG",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-20 px-4 bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 transition-colors"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
          >
            Được tin dùng bởi
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              hàng ngàn người học
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
