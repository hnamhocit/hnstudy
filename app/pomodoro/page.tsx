"use client"

import { useState, useEffect, useRef } from 'react'
import { Card, CardBody, Button, Progress, Select, SelectItem } from '@heroui/react'
import { Play, Pause, Square, Bell, BellOff, RotateCcw } from 'lucide-react'
import DefaultLayout from '@/layouts/DefaultLayout'

type TimerMode = 'work' | 'shortBreak' | 'longBreak'

export default function PomodoroPage() {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [mode, setMode] = useState<TimerMode>('work')
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true)
  const [completedSessions, setCompletedSessions] = useState<number>(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  const timerSettings = {
    work: 25,
    shortBreak: 5,
    longBreak: 15
  }

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimerComplete()
    }

    return () => clearInterval(intervalRef.current!)
  }, [isRunning, timeLeft])

  const handleTimerComplete = () => {
    setIsRunning(false)

    if (notificationsEnabled) {
      // Show browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', {
          body: mode === 'work' ? '🎉 Time for a break!' : '💪 Back to work!',
          icon: '/favicon.ico'
        })
      }

      // Play sound
      if (audioRef.current) {
        audioRef.current.play().catch(console.error)
      }
    }

    // Handle mode transition
    if (mode === 'work') {
      const newSessions = completedSessions + 1
      setCompletedSessions(newSessions)
      setMode(newSessions % 4 === 0 ? 'longBreak' : 'shortBreak')
    } else {
      setMode('work')
    }

    setTimeLeft(timerSettings[mode] * 60)
  }

  const startTimer = () => setIsRunning(true)
  const pauseTimer = () => setIsRunning(false)

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(timerSettings[mode] * 60)
  }

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false)
    setMode(newMode)
    setTimeLeft(timerSettings[newMode] * 60)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (timeLeft / (timerSettings[mode] * 60)) * 100

  const getModeColor = () => {
    switch (mode) {
      case 'work': return 'from-red-500 to-orange-500'
      case 'shortBreak': return 'from-green-500 to-emerald-500'
      case 'longBreak': return 'from-blue-500 to-cyan-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getModeText = () => {
    switch (mode) {
      case 'work': return 'Thời gian làm việc'
      case 'shortBreak': return 'Nghỉ ngắn'
      case 'longBreak': return 'Nghỉ dài'
      default: return ''
    }
  }

  return (
    <DefaultLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Pomodoro Timer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Tối ưu hóa thời gian học tập với kỹ thuật Pomodoro
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Timer */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-xl">
              <CardBody className="p-8">
                <div className="text-center space-y-8">
                  {/* Progress Circle */}
                  <div className="relative w-64 h-64 mx-auto">
                    <Progress
                      aria-label="Timer progress"
                      classNames={{
                        base: "w-full h-full",
                        track: "stroke-gray-200 dark:stroke-gray-700",
                        indicator: `stroke-8 ${getModeColor()}`,
                      }}
                      value={progressPercentage}
                      showValueLabel={false}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                          {formatTime(timeLeft)}
                        </div>
                        <div className={`text-lg font-semibold bg-gradient-to-r ${getModeColor()} bg-clip-text text-transparent`}>
                          {getModeText()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center gap-4">
                    {!isRunning ? (
                      <Button
                        color="primary"
                        size="lg"
                        startContent={<Play className="w-5 h-5" />}
                        onPress={startTimer}
                        className="bg-gradient-to-r from-green-500 to-emerald-600"
                      >
                        Bắt đầu
                      </Button>
                    ) : (
                      <Button
                        color="warning"
                        size="lg"
                        startContent={<Pause className="w-5 h-5" />}
                        onPress={pauseTimer}
                      >
                        Tạm dừng
                      </Button>
                    )}

                    <Button
                      color="default"
                      size="lg"
                      startContent={<RotateCcw className="w-5 h-5" />}
                      onPress={resetTimer}
                      variant="bordered"
                    >
                      Đặt lại
                    </Button>
                  </div>

                  {/* Mode Selector */}
                  <div className="flex justify-center gap-3">
                    <Button
                      color={mode === 'work' ? 'primary' : 'default'}
                      onPress={() => switchMode('work')}
                      variant={mode === 'work' ? 'solid' : 'bordered'}
                      className={mode === 'work' ? 'bg-gradient-to-r from-red-500 to-orange-500' : ''}
                    >
                      Làm việc
                    </Button>
                    <Button
                      color={mode === 'shortBreak' ? 'primary' : 'default'}
                      onPress={() => switchMode('shortBreak')}
                      variant={mode === 'shortBreak' ? 'solid' : 'bordered'}
                      className={mode === 'shortBreak' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}
                    >
                      Nghỉ ngắn
                    </Button>
                    <Button
                      color={mode === 'longBreak' ? 'primary' : 'default'}
                      onPress={() => switchMode('longBreak')}
                      variant={mode === 'longBreak' ? 'solid' : 'bordered'}
                      className={mode === 'longBreak' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : ''}
                    >
                      Nghỉ dài
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Stats */}
            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Thống kê phiên học
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Phiên hoàn thành:</span>
                    <span className="font-semibold text-green-600">{completedSessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Chế độ hiện tại:</span>
                    <span className="font-semibold capitalize">{getModeText().toLowerCase()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Thời gian còn lại:</span>
                    <span className="font-semibold">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Settings */}
            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Cài đặt
                </h3>
                <div className="space-y-4">
                  <Select
                    label="Thời gian làm việc"
                    defaultSelectedKeys={["25"]}
                    variant="bordered"
                  >
                    <SelectItem key="15">15 phút</SelectItem>
                    <SelectItem key="25">25 phút</SelectItem>
                    <SelectItem key="30">30 phút</SelectItem>
                    <SelectItem key="45">45 phút</SelectItem>
                  </Select>

                  <Select
                    label="Thời gian nghỉ ngắn"
                    defaultSelectedKeys={["5"]}
                    variant="bordered"
                  >
                    <SelectItem key="3">3 phút</SelectItem>
                    <SelectItem key="5">5 phút</SelectItem>
                    <SelectItem key="10">10 phút</SelectItem>
                  </Select>

                  <Select
                    label="Thời gian nghỉ dài"
                    defaultSelectedKeys={["15"]}
                    variant="bordered"
                  >
                    <SelectItem key="10">10 phút</SelectItem>
                    <SelectItem key="15">15 phút</SelectItem>
                    <SelectItem key="20">20 phút</SelectItem>
                  </Select>

                  <Button
                    variant="light"
                    startContent={notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                    onPress={() => setNotificationsEnabled(!notificationsEnabled)}
                    className="w-full justify-start"
                  >
                    {notificationsEnabled ? 'Thông báo: Bật' : 'Thông báo: Tắt'}
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardBody className="p-6">
                <h3 className="font-semibold mb-3">Mẹo Pomodoro</h3>
                <ul className="text-sm space-y-2 opacity-90">
                  <li>• Tập trung cao độ trong thời gian làm việc</li>
                  <li>• Nghỉ ngơi thực sự trong thời gian nghỉ</li>
                  <li>• Sau 4 phiên, hãy nghỉ dài hơn</li>
                  <li>• Tránh xa điện thoại khi đang học</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Hidden audio for notifications */}
        <audio ref={audioRef} src="/notification.mp3" preload="auto" />
      </div>
    </DefaultLayout>
  )
}
