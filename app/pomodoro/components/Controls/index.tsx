import { getModeGradient } from "@/utils/mode";
import { Button } from "@heroui/react";
import clsx from "clsx";
import {
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { motion } from "motion/react";
import { TimerMode } from "../../page";

interface ControlsProps {
  soundEnabled: boolean;
  setSoundEnabled: Dispatch<SetStateAction<boolean>>;
  mode: TimerMode;
  isRunning: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
}

const Controls: FC<ControlsProps> = ({
  soundEnabled,
  setSoundEnabled,
  mode,
  isRunning,
  toggleTimer,
  resetTimer,
}) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <Button
        isIconOnly
        variant="flat"
        size="lg"
        radius="full"
        onPress={() => setSoundEnabled(!soundEnabled)}
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        {soundEnabled ? <Volume2Icon size={24} /> : <VolumeXIcon size={24} />}
      </Button>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="lg"
          radius="full"
          className={clsx(
            "h-20 w-20 bg-linear-to-r text-white shadow-lg shadow-blue-500/20 flex items-center justify-center",
            getModeGradient(mode),
          )}
          onPress={toggleTimer}
        >
          {isRunning ? (
            <PauseIcon size={32} fill="currentColor" />
          ) : (
            <PlayIcon size={32} fill="currentColor" className="ml-1" />
          )}
        </Button>
      </motion.div>

      <Button
        isIconOnly
        variant="flat"
        size="lg"
        radius="full"
        onPress={resetTimer}
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <RotateCcwIcon size={24} />
      </Button>
    </div>
  );
};

export default Controls;
