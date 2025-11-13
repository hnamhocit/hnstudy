import { Accordion, AccordionItem, Button } from "@heroui/react"
import { BookOpen, Lightbulb, MessageCircle, Volume2, VolumeX } from "lucide-react"
import { FC, useState, useRef } from "react"

import { ICard } from "@/interfaces"

const Card: FC<ICard> = ({ front, phonetic, pos, definition, note, examples, audio }) => {
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
    <div className="p-4 border rounded-2xl space-y-4 bg-neutral-900 border-gray-700">
      <div className="text-3xl font-bold">{front}</div>

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

        <div className="font-medium text-white">{definition}</div>
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

        <div className="pl-7 text-sm">{note.length === 0 ? "This card doesn't have any note..." : note}</div>
      </div>
    </div>
  )
}

export default Card
