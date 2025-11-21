"use client";

import { StarIcon } from "lucide-react";
import { FC } from "react";
import { motion } from "motion/react";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  index: number;
}

const Testimonial: FC<TestimonialProps> = ({
  name,
  role,
  content,
  avatar,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          {avatar}
        </div>

        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {name}
          </div>

          <div className="text-gray-600 dark:text-gray-400 text-sm">{role}</div>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
        &quot;{content}&quot;
      </p>

      <div className="flex space-x-1 mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonial;
