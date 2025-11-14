"use client"

import { FC } from "react"
import { addToast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Progress, useDisclosure } from "@heroui/react"
import { PencilIcon, Settings2Icon, SquareArrowOutUpRight, SquareArrowOutUpRightIcon, Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"

import CircularProgress from "../CircularProgress"
import { IDeck } from "@/interfaces"
import { useDeckCards } from "@/hooks/useDeckCards"
import { getCardsStats } from "@/utils"
import { deckController } from "@/controllers"
import DeckModal from "@/components/DeckModal"


const Deck: FC<IDeck> = (props) => {
  const { id, name, description, wordCount } = props
  const { cards } = useDeckCards(id)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const router = useRouter()

  const href = `/decks/${id}`

  const stats = getCardsStats(cards)

  const handleShare = () => {
    if (window.navigator) {
      window.navigator.clipboard.writeText(`${window.origin}${href}`)
      addToast({ title: "Copied URL successfully", color: "success" })
    }
  }

  return (
    <div className="p-4 rounded-md border-2 space-y-4 border-neutral-700/50 bg-neutral-900/50">
      <div>
        <div className="text-xl font-bold">{name}</div>

        <div className="flex items-center justify-between">
          <div className="text-sm">{description.length > 0 ? description : "No description"}</div>
          <div className="text-xs py-1 px-3 rounded-full bg-neutral-950">{wordCount} words</div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-4 items-center">
        <div className="flex flex-col gap-1 items-center">
          <div className="font-bold text-3xl text-green-500">{stats.learned}</div>

          <div className="text-sm font-medium text-green-500">Learned</div>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="font-bold text-3xl text-purple-500">{stats.learning}</div>

          <div className="text-sm font-medium text-purple-500">Learning</div>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="font-bold text-3xl text-orange-500">{stats.new}</div>

          <div className="text-sm font-medium text-orange-500">New words</div>
        </div>

        <CircularProgress
          strokeWidth={6}
          size={64}
          progress={stats.accuracy * 100}
          trackColor="text-indigo-700/50"
          progressColor="text-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-300">Progress: <span className="font-semibold text-blue-500">{stats.progress}%</span></div>
        <Progress value={stats.progress} className="h-1" />
      </div>

      <div className="flex gap-3">
        <Button onPress={() => router.push(href)} fullWidth variant="faded" startContent={
          <SquareArrowOutUpRight />
        }>
          Enter
        </Button>

        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="faded">
              <Settings2Icon />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem onClick={handleShare} startContent={<SquareArrowOutUpRightIcon size={20} />} key="share">Share</DropdownItem>
            <DropdownItem onClick={onOpen} startContent={<PencilIcon size={20} />} key="edit">Edit</DropdownItem>
            <DropdownItem onClick={() => deckController.delete(id)} startContent={<Trash2Icon size={20} />} color="danger" key="delete">Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <DeckModal mode="update" isOpen={isOpen} onOpenChange={onOpenChange} deck={props} />
      </div>
    </div>
  )
}

export default Deck 
