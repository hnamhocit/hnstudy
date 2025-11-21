"use client";

import { Button } from "@heroui/react";
import { motion } from "motion/react";

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-linear-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Sẵn sàng thay đổi cách học?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
        >
          Tham gia cùng hàng ngàn người học thông minh ngay hôm nay. Hoàn toàn
          miễn phí!
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-white text-blue-600 px-8 py-6 text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 shadow-lg shadow-blue-900/20"
            >
              Tạo tài khoản miễn phí
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="bordered"
              className="border-white text-white px-8 py-6 text-lg hover:bg-white/10"
            >
              Tìm hiểu thêm
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
