import { Card, CardBody } from "@heroui/react";
import { CheckCircle2Icon } from "lucide-react";
import { motion } from "motion/react";
import { FC } from "react";

import { Settings } from "../../page";

interface StatsCardProps {
  completedSessions: number;
  settings: Settings;
}

const StatsCard: FC<StatsCardProps> = ({ completedSessions, settings }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-linear-to-br from-slate-800 to-slate-900 text-white border-none">
        <CardBody className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2Icon className="text-emerald-400" />
            Thống kê phiên
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold">{completedSessions}</div>

              <div className="text-xs text-slate-300 uppercase mt-1">
                Phiên hoàn thành
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="text-3xl font-bold">
                {Math.floor((completedSessions * settings.work) / 60)}h
              </div>

              <div className="text-xs text-slate-300 uppercase mt-1">
                Giờ tập trung
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
