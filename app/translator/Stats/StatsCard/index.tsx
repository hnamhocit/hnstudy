import { FC } from "react";
import { BookOpenIcon, TrendingUp, RotateCcw, CircleCheckBig, Brain } from "lucide-react";
import clsx from "clsx";

type Color = "blue" | "green" | "purple" | "orange"

interface StatsCardProps {
    color: Color
}

const getColorClassName = (color: Color, class1: string, class2: string, class3: string, class4: string) => {
    switch (color) {
        case "blue":
            return class1
        case "green":
            return class2
        case "purple":
            return class3
        case "orange":
            return class4
        default:
            return ""
    }
}

const getColorIcon = (color: Color) => {
    switch (color) {
        case "blue":
            return <BookOpenIcon size={24} />
        case "green":
            return <CircleCheckBig size={24} />
        case "purple":
            return <Brain size={24} />
        case "orange":
            return <RotateCcw size={24} />
    }
}

const getWrapperClassName = (color: Color) => {
    return getColorClassName(color, "bg-blue-500/50 border-blue-500/50", "bg-green-500/50 border-green-500/50", "bg-purple-500/50 border-purple-500/50", "bg-orange-500/50 border-orange-500/50")
}

const StatsCard: FC<StatsCardProps> = ({ color }) => {
    return <div className={clsx("p-4 rounded-2xl border-2 space-y-4", getWrapperClassName(color))}>
        <div className="flex items-center justify-between">
            <div className={clsx("p-2 rounded-2xl text-white", getColorClassName(color, "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"))}>
                {getColorIcon(color)}
            </div>

            <div
                className="py-1 px-3 bg-neutral-900 text-white font-medium text-sm rounded-full">Total
            </div>
        </div>

        <div className="space-y-2">
            <div className={clsx("text-3xl font-bold", getColorClassName(color, "text-blue-500", "text-green-500", "text-purple-500", "text-orange-500"))}>0</div>

            <div className="text-sm font-medium">All vocabulary</div>

            <div className="flex items-center gap-3 text-xs">
                <TrendingUp size={18} />
                <div>+0 has learned from this weekend</div>
            </div>
        </div>

    </div>
}

export default StatsCard
