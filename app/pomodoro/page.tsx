"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "motion/react";

import DefaultLayout from "@/layouts/DefaultLayout";
import ModeSwitcher from "./components/MoodeSwitcher";
import CircularTimer from "./components/CircularTimer";
import Controls from "./components/Controls";
import StatsCard from "./components/StatsCard";
import SettingsCard from "./components/SettingsCard";

export type TimerMode = "work" | "shortBreak" | "longBreak";

export interface Settings {
  work: number;
  shortBreak: number;
  longBreak: number;
}

export default function PomodoroPage() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(0);

  const [settings, setSettings] = useState({
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode);
      setIsRunning(false);
      setTimeLeft(settings[newMode] * 60);
    },
    [settings],
  );

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch(() => console.log("Audio play failed"));
    }

    if (mode === "work") {
      const newSessions = completedSessions + 1;
      setCompletedSessions(newSessions);
      // Every 4 sessions, take a long break
      if (newSessions % 4 === 0) {
        switchMode("longBreak");
      } else {
        switchMode("shortBreak");
      }
    } else {
      switchMode("work");
    }
  }, [mode, completedSessions, soundEnabled, switchMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/notification.mp3");
    }
  }, []);

  // Update document title
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    const label = mode === "work" ? "Focus" : "Break";
    document.title = `${minutes}:${seconds} - ${label} | hnstudy`;
  }, [timeLeft, mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      const timeout = setTimeout(() => {
        handleTimerComplete();
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [timeLeft, isRunning, handleTimerComplete]);

  // --- Handlers ---

  const handleSettingChange = (key: keyof typeof settings, value: string) => {
    if (!value) return;
    const numValue = parseInt(value);
    setSettings((prev) => ({ ...prev, [key]: numValue }));

    // If modifying the current mode's time, update timeLeft immediately if paused
    if (mode === key && !isRunning) {
      setTimeLeft(numValue * 60);
    }
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings[mode] * 60);
  };

  return (
    <DefaultLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Pomodoro Focus
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Quản lý năng lượng, không chỉ là quản lý thời gian
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Main Timer */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md overflow-visible">
              <CardBody className="p-8 lg:p-12">
                <ModeSwitcher mode={mode} switchMode={switchMode} />

                <CircularTimer
                  mode={mode}
                  timeLeft={timeLeft}
                  isRunning={isRunning}
                  settings={settings}
                />

                <Controls
                  soundEnabled={soundEnabled}
                  setSoundEnabled={setSoundEnabled}
                  isRunning={isRunning}
                  mode={mode}
                  toggleTimer={toggleTimer}
                  resetTimer={resetTimer}
                />
              </CardBody>
            </Card>
          </div>

          {/* Right Column: Stats & Settings */}
          <div className="lg:col-span-4 space-y-6">
            <StatsCard
              completedSessions={completedSessions}
              settings={settings}
            />

            {/* Settings Card */}
            <SettingsCard
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          </div>
        </div>
      </motion.div>
    </DefaultLayout>
  );
}
