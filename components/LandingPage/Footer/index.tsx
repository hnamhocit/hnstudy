"use client";

import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-900 dark:bg-slate-950 text-white py-12 px-4 transition-colors"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo và Tên Website: Trượt từ trái vào */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="flex items-center space-x-2 mb-4 md:mb-0"
          >
            <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold">hnstudy</span>
          </motion.div>

          {/* Các liên kết: Mỗi cái bay vào với độ trễ khác nhau */}
          <motion.div
            className="flex space-x-6 text-gray-400"
            // Có thể dùng staggerChildren nếu muốn animate từng link con
            // Hoặc animate cả khối rồi để mỗi link tự có delay riêng
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            <a href="#" className="hover:text-white transition-colors">
              Điều khoản
            </a>

            <a href="#" className="hover:text-white transition-colors">
              Bảo mật
            </a>

            <a href="#" className="hover:text-white transition-colors">
              Liên hệ
            </a>
          </motion.div>
        </div>

        {/* Dòng Copyright: Mờ dần hiện ra */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }} // Chỉ chạy khi 50% copyright vào view
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="text-center text-gray-500 mt-8"
        >
          © 2025 hnstudy. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
