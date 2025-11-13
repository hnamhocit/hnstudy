import { Button, Input } from "@heroui/react"
import { Search } from "lucide-react"
import NewDeckModal from "./NewDeckModal"

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="p-2 rounded-2xl bg-neutral-700">
        <Button variant="light" size="sm">My flashcard</Button>
        <Button variant="light" size="sm">Explore</Button>
        <Button variant="light" size="sm">Learned</Button>
      </div>

      <div className="flex items-center gap-3">
        <Input startContent={<Search size={18} />} placeholder="Enter here..." />

        <NewDeckModal />
      </div>
    </div>
  )
}

export default Header 
