"use client"

import { Avatar, Tooltip } from "@heroui/react"
import clsx from "clsx"
import Link from "next/link"
import {
    CalendarDaysIcon,
    ChartPieIcon,
    ClockIcon,
    DatabaseIcon,
    LanguagesIcon,
    NotebookPenIcon,
    Home,
    Settings,
    TrendingUp,
    CreditCard,
} from "lucide-react";
import { usePathname } from "next/navigation";

const pages = [
    {
        href: "/",
        icon: <Home size={20} />,
        label: "Trang chủ"
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
        href: "/leaderboard",
        icon: <TrendingUp size={20} />,
        label: "Xếp hạng"
    },
    {
        href: "/pricing",
        icon: <CreditCard size={20} />,
        label: "Nâng cấp"
    }
]

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className="shrink-0 w-20 flex flex-col border-r border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md justify-between items-center py-6">
            {/* Logo */}
            <Link href="/" className="mb-8">
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
                                "hover:bg-linear-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:shadow-lg",
                                "hover:scale-110",
                                pathname === page.href
                                    ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110"
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
            <Tooltip
                content="Cài đăt"
                placement="right"
                showArrow
                classNames={{
                    content: "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                }}
            >
                <Link
                    href="/settings"
                    className={clsx(
                        "flex items-center justify-center rounded-xl p-3 transition-all duration-300 group relative",
                        "hover:bg-linear-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:shadow-lg",
                        "hover:scale-110",
                        pathname === "/settings"
                            ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110"
                            : "text-gray-600 dark:text-gray-400 hover:text-white"
                    )}
                >
                    <Settings size={20} />

                    {/* Active indicator */}
                    {pathname === "/settings" && (
                        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-l-full"></div>
                    )}
                </Link>
            </Tooltip>

        </div>
    )
}

export default Sidebar
