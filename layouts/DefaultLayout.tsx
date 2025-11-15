"use client"

import { ReactNode } from "react"
import Sidebar from "./components/Sidebar"

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900 transition-colors">
            <Sidebar />

            <div className="flex-1 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout
