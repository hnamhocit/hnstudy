import { getModeColor } from "@/utils/mode";
import { motion } from "motion/react";
import { FC } from "react";

import { Settings, TimerMode } from "../../page";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

interface CircularTimerProps {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  settings: Settings;
}

const CircularTimer: FC<CircularTimerProps> = ({
  timeLeft,
  mode,
  isRunning,
  settings,
}) => {
  const totalTime = settings[mode] * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const circumference = 283;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center mb-12">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-gray-100 dark:stroke-slate-700 fill-none"
            strokeWidth="6"
          />

          {/* Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            className={`fill-none ${getModeColor(mode)} transition-colors duration-500`}
            strokeWidth="6" // Độ dày nét
            strokeLinecap="round"
            strokeDasharray="283" // Chu vi cố định: 2 * pi * 45 ≈ 283
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>

        {/* Time Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={timeLeft}
            className="text-7xl sm:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white font-mono"
          >
            {formatTime(timeLeft)}
          </motion.div>

          <div className="mt-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            {isRunning ? "Running" : "Paused"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTimer;
