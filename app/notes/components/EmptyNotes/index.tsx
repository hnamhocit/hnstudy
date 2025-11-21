import { Card, CardBody, Button } from "@heroui/react";
import { FileText, Plus, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const EmptyNotes = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-dashed border-gray-300 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/30">
        <CardBody className="p-12 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <FileText className="w-20 h-20 text-gray-300 dark:text-slate-600" />
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -bottom-2 -right-2"
              >
                <BookOpen className="w-10 h-10 text-blue-500 drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Chưa có ghi chú nào
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
            Bắt đầu hành trình học tập của bạn bằng cách tạo ghi chú đầu tiên.
            Lưu trữ kiến thức, ý tưởng và những điều quan trọng một cách dễ
            dàng.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                color="primary"
                size="lg"
                startContent={<Plus className="w-5 h-5" />}
                onPress={() => router.push("/notes/editor")}
                className="bg-linear-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 font-semibold"
              >
                Tạo ghi chú đầu tiên
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="bordered"
                size="lg"
                onPress={() => router.push("/tutorial")}
                className="font-medium border-gray-300 dark:border-slate-600"
              >
                Hướng dẫn sử dụng
              </Button>
            </motion.div>
          </div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 p-5 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 inline-block text-left"
          >
            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
              💡 Mẹo bắt đầu
            </h4>

            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Ghi chú giúp bạn ghi nhớ kiến thức lâu hơn
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Sử dụng Markdown để định dạng ghi chú đẹp mắt
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Thêm tags để dễ dàng tìm kiếm sau này
              </li>
            </ul>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default EmptyNotes;
