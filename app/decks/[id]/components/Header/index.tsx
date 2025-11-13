import { addToast, Button, toast } from "@heroui/react"
import { ChevronLeft, Clock, Trash, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"

import AddCardModal from "./AddCardModal"
import AddMoreModal from "./AddMoreModal"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/config"

interface HeaderProps {
  name?: string
  description?: string
  id: string
}

const Header: FC<HeaderProps> = ({ name, description, id }) => {
  const router = useRouter()
  const [isDisabled, setIsDisabled] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDisabled(true)

      await deleteDoc(doc(db, 'decks', id))
    } catch (error: any) {
      addToast({
        title: error?.message,
        color: "danger"
      })
    } finally {
      setIsDisabled(false)
    }
  }

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
          <AddCardModal id={id} />
          <AddMoreModal />
          <Button isLoading={isDisabled} onPress={handleDelete} startContent={<Trash size={20} />} color="danger">Delete</Button>
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
