import clsx from "clsx"
import { Globe } from "lucide-react"
import { FC } from "react"

interface SelectableProps {
  isOpen: boolean
  onChange: () => void
  name: "public" | "private"
}

const Selectable: FC<SelectableProps> = ({ isOpen, onChange, name }) => {
  return (
    <button onClick={onChange} className={clsx("block p-4 rounded-lg border border-r-4 border-b-4 bg-neutral-900 border-neutral-700/50 transition-all", isOpen && (name === "public" ? "!bg-green-500" : "!bg-red-500"))}>
      <div className="flex items-center gap-3 text-lg font-semibold">
        <Globe size={20} className={clsx(isOpen ? "text-white" : (name === "public" ? "text-green-500" : "text-red-500"))} />
        <div>Public</div>
      </div>

      <div className={clsx("text-sm text-left", isOpen ? "text-gray-200" : "text-gray-500")}>Everyone can find and use your desk</div>
    </button>
  )
}

export default Selectable
