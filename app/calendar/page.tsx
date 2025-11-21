"use client";

import { Button, Card, CardBody, Progress } from "@heroui/react";
import {
  BookOpen,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreVertical,
  Plus,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import DefaultLayout from "@/layouts/DefaultLayout";

// --- Types & Mock Data ---
type Event = {
  id: number;
  title: string;
  time: string;
  date: Date; // Dùng Date object để so sánh logic
  type: "study" | "group" | "homework" | "exam";
  color: string;
};

// Mock events (Tự động sinh ngày cho tháng hiện tại để demo)
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Ôn tập từ vựng TOEIC",
    time: "09:00 - 10:00",
    date: new Date(currentYear, currentMonth, today.getDate()), // Hôm nay
    type: "study",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Học React Hooks",
    time: "14:00 - 15:30",
    date: new Date(currentYear, currentMonth, today.getDate()), // Hôm nay
    type: "study",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Nhóm học tiếng Anh",
    time: "19:00 - 20:30",
    date: new Date(currentYear, currentMonth, today.getDate() + 1), // Ngày mai
    type: "group",
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Làm bài tập Toán",
    time: "15:00 - 16:30",
    date: new Date(currentYear, currentMonth, today.getDate() + 3), // 3 ngày nữa
    type: "homework",
    color: "bg-orange-500",
  },
];

const studyStats = [
  { subject: "Tiếng Anh", hours: 12, progress: 75, color: "primary" },
  { subject: "Lập trình", hours: 8, progress: 60, color: "secondary" },
  { subject: "Toán học", hours: 6, progress: 45, color: "warning" },
  { subject: "Khoa học", hours: 4, progress: 30, color: "success" },
];

const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export default function CalendarPage() {
  // --- Logic State ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [direction, setDirection] = useState(0); // -1: left, 1: right

  // --- Calendar Helper Functions ---
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handleToday = () => {
    const now = new Date();
    setDirection(now > currentDate ? 1 : -1);
    setCurrentDate(now);
    setSelectedDate(now);
  };

  // --- Render Logic ---
  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getFirstDayOfMonth(currentDate); // 0 = Sunday

  // Check if a date has events
  const hasEvent = (day: number) => {
    return upcomingEvents.some(
      (e) =>
        e.date.getDate() === day &&
        e.date.getMonth() === currentDate.getMonth() &&
        e.date.getFullYear() === currentDate.getFullYear(),
    );
  };

  // Check if it's "Today"
  const isToday = (day: number) => {
    const now = new Date();
    return (
      day === now.getDate() &&
      currentDate.getMonth() === now.getMonth() &&
      currentDate.getFullYear() === now.getFullYear()
    );
  };

  // Check if selected
  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Variants for Animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto space-y-8 h-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Lịch học tập
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Quản lý thời gian và lịch trình hiệu quả
            </p>
          </div>
          <Button
            className="bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 font-medium"
            startContent={<Plus className="w-5 h-5" />}
          >
            Thêm sự kiện
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN: CALENDAR & EVENTS --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar Card */}
            <Card className="border-none shadow-md dark:bg-slate-800">
              <CardBody className="p-6">
                {/* Controls */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                    Tháng {currentDate.getMonth() + 1},{" "}
                    {currentDate.getFullYear()}
                  </h2>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700/50 rounded-xl p-1">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={handlePrevMonth}
                    >
                      <ChevronLeft size={20} />
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      className="font-medium text-xs"
                      onPress={handleToday}
                    >
                      Hôm nay
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={handleNextMonth}
                    >
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                </div>

                {/* Weekday Header */}
                <div className="grid grid-cols-7 mb-4">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days Grid with Animation */}
                <div className="relative overflow-hidden min-h-[300px]">
                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="wait"
                  >
                    <motion.div
                      key={currentDate.toString()}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="grid grid-cols-7 gap-2"
                    >
                      {/* Padding for empty start days */}
                      {Array.from({ length: startDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}

                      {/* Actual Days */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const active = isSelected(day);
                        const today = isToday(day);
                        const eventDot = hasEvent(day);

                        return (
                          <div
                            key={day}
                            onClick={() =>
                              setSelectedDate(
                                new Date(
                                  currentDate.getFullYear(),
                                  currentDate.getMonth(),
                                  day,
                                ),
                              )
                            }
                            className={`
                              relative h-14 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group
                              ${
                                active
                                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 z-10"
                                  : today
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-200 dark:border-blue-800"
                                    : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300"
                              }
                            `}
                          >
                            <span
                              className={`text-lg ${active || today ? "font-bold" : "font-medium"}`}
                            >
                              {day}
                            </span>

                            {/* Event Indicator Dot */}
                            {eventDot && (
                              <span
                                className={`mt-1 w-1.5 h-1.5 rounded-full ${active ? "bg-white" : "bg-orange-500"}`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </CardBody>
            </Card>

            {/* Upcoming Events List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Sự kiện sắp tới
                </h3>
                <Button variant="light" size="sm" className="text-blue-500">
                  Xem tất cả
                </Button>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all"
                  >
                    {/* Date Box */}
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white border border-gray-100 dark:border-slate-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                      <span className="text-xs font-medium uppercase text-gray-500">
                        T{event.date.getMonth() + 1}
                      </span>
                      <span className="text-xl font-bold">
                        {event.date.getDate()}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span
                            className={`w-2 h-2 rounded-full ${event.color}`}
                          ></span>
                          <span className="capitalize">{event.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      className="text-gray-400"
                    >
                      <MoreVertical size={18} />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: SIDEBAR --- */}
          <div className="space-y-6">
            {/* Study Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-none shadow-md dark:bg-slate-800">
                <CardBody className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                    Thống kê tuần
                  </h3>
                  <div className="space-y-5">
                    {studyStats.map((stat, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {stat.subject}
                          </span>
                          <span className="text-gray-500">{stat.hours}h</span>
                        </div>
                        <Progress
                          value={stat.progress}
                          className="h-2"
                          color={stat.color as unknown as undefined}
                          aria-label={`${stat.subject} progress`}
                        />
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Quick Actions Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-3"
            >
              <Button
                className="h-auto py-4 flex flex-col gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm"
                variant="bordered"
              >
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                  <BookOpen size={20} />
                </div>
                <span className="text-xs font-semibold">Lịch ôn tập</span>
              </Button>

              <Button
                className="h-auto py-4 flex flex-col gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 shadow-sm"
                variant="bordered"
              >
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                  <Users size={20} />
                </div>
                <span className="text-xs font-semibold">Học nhóm</span>
              </Button>

              <Button
                className="h-auto py-4 flex flex-col gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 shadow-sm"
                variant="bordered"
              >
                <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600">
                  <Clock size={20} />
                </div>
                <span className="text-xs font-semibold">Lời nhắc</span>
              </Button>

              <Button
                className="h-auto py-4 flex flex-col gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 shadow-sm"
                variant="bordered"
              >
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                  <CalendarIcon size={20} />
                </div>
                <span className="text-xs font-semibold">Thi cử</span>
              </Button>
            </motion.div>

            {/* Weekly Goal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-linear-to-br from-emerald-500 to-teal-600 text-white border-none shadow-lg shadow-emerald-500/20">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Mục tiêu tuần</h3>
                    <span className="bg-white/20 px-2 py-1 rounded-lg text-xs font-medium">
                      Tuần 42
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold">85%</span>
                      <span className="text-emerald-100 mb-1">hoàn thành</span>
                    </div>

                    <Progress
                      value={85}
                      className="h-2"
                      classNames={{
                        indicator: "bg-white",
                        track: "bg-white/20",
                      }}
                    />

                    <p className="text-sm text-emerald-50/90 leading-relaxed">
                      Bạn đang làm rất tốt! Chỉ còn <strong>3 task</strong> nữa
                      là hoàn thành mục tiêu tuần này.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
