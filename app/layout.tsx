import type { Metadata } from "next";
import { Be_Vietnam_Pro, Nunito } from "next/font/google";

import "./globals.css";
import Providers from "@/components/Providers";
import StyledComponentsRegistry from "./registry";

const font = Be_Vietnam_Pro({
    subsets: ["latin", "vietnamese"],
    weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
    title: "hnstudy - Học tập thông minh",
    description: "Nền tảng học tập toàn diện với flashcards, pomodoro, lịch học và ghi chú",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body
                className={`${font.className} min-h-screen antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900 text-gray-900 dark:text-gray-100 transition-colors`}
            >
                <Providers>
                    <StyledComponentsRegistry>
                        {children}
                    </StyledComponentsRegistry>
                </Providers>
            </body>
        </html>
    );
}
