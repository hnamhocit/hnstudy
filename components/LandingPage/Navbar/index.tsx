"use client";

import { Button, Image, useDisclosure } from "@heroui/react";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react"; // Import motion

import AuthModal from "../AuthModal";
import { useUserStore } from "@/stores";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-slate-700"
    >
      <div className="container mx-auto px-4 py-4">
        <motion.div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => router.push("/")}
          >
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={40}
              height={40}
              radius="full"
            />

            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              hnstudy
            </span>
          </motion.div>

          <motion.div
            initial={{ translateX: 100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-4"
          >
            {user ? (
              // 3. Dashboard Button Wrapper
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onPress={() => router.push("/dashboard")}
                  startContent={<UserIcon className="w-4 h-4" />}
                  className="bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                >
                  Dashboard
                </Button>
              </motion.div>
            ) : (
              <>
                {/* 4. Login Button Wrapper */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="light"
                    className="hidden sm:flex dark:text-gray-300"
                    onPress={onOpen}
                  >
                    Đăng nhập
                  </Button>
                </motion.div>

                {/* 5. Start Free Button Wrapper */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    color="primary"
                    className="bg-linear-to-r from-blue-500 to-purple-600 shadow-lg shadow-purple-500/20"
                    onPress={onOpen}
                  >
                    Bắt đầu miễn phí
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>

          <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
