"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface FeatureProps {
  color: string;
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({
  color,
  icon,
  title,
  description,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className={`group p-8 rounded-2xl border-2 border-transparent bg-linear-to-br ${color} bg-opacity-5 dark:bg-opacity-10 hover:bg-opacity-10 dark:hover:bg-opacity-20 transition-colors duration-500 hover:shadow-2xl dark:border-gray-700`}
    >
      <div
        className={`w-16 h-16 rounded-2xl bg-linear-to-r ${color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default Feature;
