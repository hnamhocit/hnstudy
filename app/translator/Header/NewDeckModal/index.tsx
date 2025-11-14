import { Plus } from "lucide-react"
import { useDisclosure } from "@heroui/react"

import DeckModal from "@/components/DeckModal"

const NewDeckModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <button onClick={onOpen} className="flex items-center shrink-0 gap-2 py-2 px-3 text-sm rounded-md bg-blue-500 text-white">
        <Plus size={18} />
        <div>New desk</div>
      </button>

      <DeckModal isOpen={isOpen} onOpenChange={onOpenChange} mode="create" />
    </>
  )
}

export default NewDeckModal 
