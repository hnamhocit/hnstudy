"use client";

import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Ghi chú
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400">
          Lưu trữ và quản lý kiến thức của bạn
        </p>
      </div>

      <Link href={`/notes/editor`}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            color="primary"
            size="lg"
            startContent={<Plus className="w-5 h-5" />}
            className="bg-linear-to-r from-blue-500 to-purple-600 mt-4 lg:mt-0 shadow-lg shadow-blue-500/30"
          >
            Tạo ghi chú mới
          </Button>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Header;
