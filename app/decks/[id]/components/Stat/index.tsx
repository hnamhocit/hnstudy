import clsx from "clsx";
import { FC, ReactNode } from "react";
import { motion } from "motion/react";

interface StatProps {
  label: string;
  value: number;
  icon: ReactNode;
  className?: string;
  delay?: number;
}

const Stat: FC<StatProps> = ({ label, value, icon, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: "easeOut" }}
      className={clsx(
        "relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-1 cursor-default",
        "border backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="space-y-1">
          <div className="text-xs font-bold opacity-80 uppercase tracking-wider drop-shadow-sm">
            {label}
          </div>

          <div className="text-4xl font-black tracking-tight drop-shadow-md">
            {value}
          </div>
        </div>

        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/30 border shadow-inner">
          {icon}
        </div>
      </div>

      <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-white/10 blur-3xl pointer-events-none mix-blend-overlay" />
    </motion.div>
  );
};

export default Stat;
