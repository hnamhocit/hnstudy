import { Button } from "@heroui/react"
import { ChevronLeft, Clock, Trash, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dispatch, FC, SetStateAction } from "react"

import AddCardModal from "./AddCardModal"
import AddMoreModal from "./AddMoreModal"
import { ICard } from "@/interfaces"

interface HeaderProps {
  name?: string
  description?: string
  id: string
  setCards: Dispatch<SetStateAction<ICard[]>>
}

const Header: FC<HeaderProps> = ({ name, description, setCards, id }) => {
  const router = useRouter()

  return (
    <div className="sticky top-0 bg-neutral-900/70 backdrop-blur-xl border-b border-white/5 left-0 w-full h-28 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="faded" isIconOnly onPress={() => router.back()}>
            <ChevronLeft size={20} />
          </Button>

          <div>
            <div className="text-xl font-bold text-white">{name}</div>
            <p className="text-sm font-medium dark:text-gray-400">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AddCardModal setCards={setCards} id={id} />
          <AddMoreModal />
          <Button startContent={<Trash size={20} />} color="danger">Delete</Button>
        </div>
      </div>

      <div className="flex items-center gap-7 mt-3">
        <div className="flex items-center gap-2">
          <User size={18} />
          <div>Owner:</div>
          <div className="font-semibold text-white">123best</div>
        </div>

        <div className="flex items-center gap-3">
          <Clock size={18} />
          <div>{new Date().toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

export default Header 
