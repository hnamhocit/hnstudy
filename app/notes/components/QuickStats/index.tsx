import { Card, CardBody } from "@heroui/react";
import { motion } from "motion/react";
import { INote } from "@/interfaces";
import { FC } from "react";

interface QuickStatsProps {
  notes?: INote[];
}

const QuickStats: FC<QuickStatsProps> = ({ notes = [] }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className="bg-linear-to-br from-blue-500 to-cyan-600 text-white border-none shadow-lg shadow-blue-500/20">
        <CardBody className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="bg-white/20 p-1 rounded">📊</span> Thống kê
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <span>Tổng ghi chú:</span>
              <span className="font-bold text-xl">{notes.length}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="opacity-90">Đã gắn thẻ:</span>
              <span className="font-semibold">
                {notes.filter((n) => n.tags.length > 0).length}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="opacity-90">Tháng này:</span>
              <span className="font-semibold">
                {
                  notes.filter(
                    (n) =>
                      new Date(n.createdAt).getMonth() ===
                      new Date().getMonth(),
                  ).length
                }
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default QuickStats;
