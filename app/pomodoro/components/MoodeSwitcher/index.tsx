import clsx from "clsx";
import { Armchair, BrainIcon, CoffeeIcon } from "lucide-react";

import { TimerMode } from "../../page";
import { getModeGradient } from "@/utils/mode";

interface ModeSwitcherProps {
  switchMode: (value: TimerMode) => void;
  mode: TimerMode;
}

const modes = [
  { id: "work", label: "Focus", icon: BrainIcon },
  { id: "shortBreak", label: "Short Break", icon: CoffeeIcon },
  { id: "longBreak", label: "Long Break", icon: Armchair },
];

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ switchMode, mode }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-100 dark:bg-slate-700/50 p-1 rounded-xl inline-flex">
        {modes.map((item) => (
          <button
            key={item.id}
            onClick={() => switchMode(item.id as TimerMode)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
              mode === item.id
                ? `bg-linear-to-r ${getModeGradient(mode)} text-white shadow-lg`
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600",
            )}
          >
            <item.icon size={16} />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSwitcher;
