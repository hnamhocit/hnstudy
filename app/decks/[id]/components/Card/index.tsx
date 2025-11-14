import { Accordion, AccordionItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react"
import { BookOpen, EllipsisIcon, Lightbulb, MessageCircle, PencilIcon, Trash2Icon, Volume2, VolumeX } from "lucide-react"
import { Gloria_Hallelujah } from "next/font/google"
import clsx from "clsx"
import { FC, useState, useRef } from "react"

import { ICard } from "@/interfaces"
import { cardController } from "@/controllers"
import UpdateCardModal from "@/components/UpdateCardModal"

const font = Gloria_Hallelujah({
  weight: "400"
})

const Card: FC<ICard> = (props) => {
  const { id, front, phonetic, pos, definition, note, examples, audio, deckId } = props
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleAudio = async () => {
    if (!audioRef.current || !audio) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error("Failed to play audio:", error)
      }
    }
  }

  const handleAudioEnd = () => {
    setIsPlaying(false)
  }

  return (
    <div className="relative p-4 border rounded-2xl space-y-4 bg-neutral-900 border-gray-700">

      <div className="absolute top-3 right-3">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <EllipsisIcon size={20} />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem onClick={onOpen} startContent={<PencilIcon size={20} />} key="update">Edit</DropdownItem>
            <DropdownItem onClick={() => cardController.delete(deckId, id)} color="danger" startContent={<Trash2Icon size={20} />} key="Delete">Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <UpdateCardModal isOpen={isOpen} onOpenChange={onOpenChange} deckId={deckId} card={props} />
      </div>

      <div className={clsx("text-3xl font-bold", font.className)}>{front}</div>

      <div className="flex items-center gap-3">
        <div>{phonetic}</div>

        {audio && (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={toggleAudio}
            isDisabled={!audio}
          >
            {isPlaying ? (
              <VolumeX size={20} className="text-red-400" />
            ) : (
              <Volume2 size={20} className="text-blue-400" />
            )}
          </Button>
        )}

        <div>{pos}</div>
      </div>

      {/* Hidden audio element */}
      {audio && (
        <audio
          ref={audioRef}
          src={audio}
          onEnded={handleAudioEnd}
          onPause={() => setIsPlaying(false)}
          preload="none"
        />
      )}

      <div className="bg-neutral-950 p-4 border-l-2 space-y-2">
        <div className="flex items-center gap-3 text-gray-400">
          <BookOpen size={20} />
          <div>Definition</div>
        </div>

        <div className={clsx("font-medium text-white", font.className)}>{definition}</div>
      </div>

      <Accordion>
        <AccordionItem title={
          <div className="flex items-center gap-3">
            <MessageCircle size={20} />
            <div>Examples ({examples.length})</div>
          </div>
        }>
          {examples.map((e, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="text-gray-300">{e.from}</div>
              <div className="text-gray-500 text-sm">{e.to}</div>
            </div>
          ))}
        </AccordionItem>
      </Accordion>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Lightbulb size={20} />
          <div>Note</div>
        </div>

        <div className={clsx("pl-7 text-sm", font.className)}>{note.length === 0 ? "This card doesn't have any note..." : note}</div>
      </div>
    </div>
  )
}

export default Card
