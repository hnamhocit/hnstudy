import { TimerMode } from "@/app/pomodoro/page";

const getModeColor = (mode: TimerMode) => {
  switch (mode) {
    case "work":
      return "text-red-500 stroke-red-500";
    case "shortBreak":
      return "text-emerald-500 stroke-emerald-500";
    case "longBreak":
      return "text-blue-500 stroke-blue-500";
  }
};

const getModeGradient = (mode: TimerMode) => {
  switch (mode) {
    case "work":
      return "from-red-500 to-orange-500";
    case "shortBreak":
      return "from-emerald-500 to-teal-500";
    case "longBreak":
      return "from-blue-500 to-indigo-500";
  }
};

export { getModeColor, getModeGradient };
