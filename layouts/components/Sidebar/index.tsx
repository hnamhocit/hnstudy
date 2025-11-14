"use client"

import { Avatar, Button, Tooltip } from "@heroui/react"
import clsx from "clsx"
import Link from "next/link"
import {
    CalendarDaysIcon,
    ChartPieIcon,
    ClockIcon,
    DatabaseIcon,
    LanguagesIcon,
    LayoutGrid,
    NotebookPenIcon,
    SettingsIcon,
    Home,
    Flashlight
} from "lucide-react";
import { usePathname } from "next/navigation";

const pages = [
    {
        href: "/dashboard",
        icon: <LayoutGrid size={20} />,
        label: "Dashboard"
    },
    {
        href: "/pomodoro",
        icon: <ClockIcon size={20} />,
        label: "Pomodoro"
    },
    {
        href: "/calendar",
        icon: <CalendarDaysIcon size={20} />,
        label: "Lịch học"
    },
    {
        href: "/notes",
        icon: <NotebookPenIcon size={20} />,
        label: "Ghi chú"
    },
    {
        href: "/translator",
        icon: <LanguagesIcon size={20} />,
        label: "Dịch thuật"
    },
    {
        href: "/storage",
        icon: <DatabaseIcon size={20} />,
        label: "Lưu trữ"
    },
    {
        href: "/analytics",
        icon: <ChartPieIcon size={20} />,
        label: "Phân tích"
    }
]

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className="shrink-0 w-20 flex flex-col border-r border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md justify-between items-center py-6">
            {/* Logo */}
            <Link href="/dashboard" className="mb-8">
                <Avatar
                    src="/logo.jpg"
                    alt="hnstudy"
                    className="w-12 h-12 border-2 border-blue-200 dark:border-blue-800 hover:scale-110 transition-transform"
                    isBordered
                />
            </Link>

            {/* Navigation */}
            <div className="flex flex-col gap-3 flex-1">
                {pages.map(page => (
                    <Tooltip
                        key={page.href}
                        content={page.label}
                        placement="right"
                        showArrow
                        classNames={{
                            content: "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                        }}
                    >
                        <Link
                            href={page.href}
                            className={clsx(
                                "flex items-center justify-center rounded-xl p-3 transition-all duration-300 group relative",
                                "hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:shadow-lg",
                                "hover:scale-110",
                                pathname === page.href
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110"
                                    : "text-gray-600 dark:text-gray-400 hover:text-white"
                            )}
                        >
                            {page.icon}

                            {/* Active indicator */}
                            {pathname === page.href && (
                                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-l-full"></div>
                            )}
                        </Link>
                    </Tooltip>
                ))}
            </div>

            {/* Settings & Home */}
            <div className="flex flex-col gap-3">
                <Tooltip
                    content="Trang chủ"
                    placement="right"
                    showArrow
                >
                    <Link href="/">
                        <Button
                            isIconOnly
                            variant="light"
                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all"
                        >
                            <Home size={20} />
                        </Button>
                    </Link>
                </Tooltip>

                <Tooltip
                    content="Cài đặt"
                    placement="right"
                    showArrow
                >
                    <Button
                        isIconOnly
                        variant="light"
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all"
                    >
                        <SettingsIcon size={20} />
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default Sidebar
