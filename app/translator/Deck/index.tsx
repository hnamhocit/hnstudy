"use client"

import { FC } from "react"
import { Button, Progress } from "@heroui/react"
import { Settings2Icon, SquareArrowOutUpRight } from "lucide-react"

import CircularProgress from "../CircularProgress"
import { IDeck } from "@/interfaces"
import { useRouter } from "next/navigation"

const Deck: FC<IDeck> = ({ id, name, description, stats, wordCount, lastSessionAccuracy }) => {
  const progress = wordCount === 0 ? 0 : (stats.learned / wordCount) * 100
  const router = useRouter()

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
          progress={lastSessionAccuracy * 100}
          trackColor="text-indigo-700/50"
          progressColor="text-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-300">Progress: <span className="font-semibold text-blue-500">{progress}%</span></div>
        <Progress value={progress} className="h-1" />
      </div>

      <div className="flex gap-3">
        <Button onPress={() => router.push(`/decks/${id}`)} fullWidth variant="faded" startContent={
          <SquareArrowOutUpRight />
        }>
          Enter
        </Button>

        <Button isIconOnly variant="faded">
          <Settings2Icon />
        </Button>
      </div>
    </div>
  )
}

export default Deck 
