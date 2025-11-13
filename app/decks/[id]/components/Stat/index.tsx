import clsx from "clsx"
import { FC, ReactNode } from "react"

interface StatProps {
  label: string
  value: number
  icon: ReactNode
  className?: string
}

const Stat: FC<StatProps> = ({ label, value, icon, className }) => {
  return (
    <div className={clsx("rounded-2xl p-4 border-l border-t border-r-4 border-b-4 transition-all flex items-center justify-between", className)}>
      <div>
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-3xl font-bold">{value}</div>
      </div>

      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-700/50">
        {icon}
      </div>
    </div>
  )
}

export default Stat 
