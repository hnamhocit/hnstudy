"use client"

import DefaultLayout from "@/layouts/DefaultLayout"
import { Button, Input } from "@heroui/react"
import { Cuboid, CuboidIcon, ListIcon, PlayIcon, PlusIcon, SearchIcon } from "lucide-react"
import { useState } from "react"

const FlashCard = () => {
  const [decks, setDecks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <DefaultLayout>
      <div className="flex items-center justify-between mb-12">
        <div className="w-80">
          <Input startContent={
            <SearchIcon size={20} />
          } />
        </div>

        <div className="flex items-center gap-3">
          <Button isIconOnly>
            <ListIcon size={20} />
          </Button>

          <Button color="primary" startContent={
            <PlusIcon size={20} />
          }>New</Button>
        </div>
      </div>

      <div className="text-3xl font-bold mb-4">Decks</div>

      <div className="grid grid-cols-4 gap-4">
        <div className="relative text-neutral-700 bg-white p-5 rounded-2xl border-2 shadow-md flex flex-col gap-4">

          {/* Phần Tiêu Đề */}
          <div>
            <div className="text-lg font-semibold">Designing Data-Intensive Applications</div>
          </div>

          {/* Phần Tiến Trình (Progress Bar) */}
          <div>
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
              <span>Progress</span>
              <span>60/150</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>

          {/* Phần Số Liệu (Stats) */}
          <div className="flex justify-around text-center rounded-2xl bg-neutral-900 text-white/70 py-3">
            <div>
              <div className="text-2xl font-bold text-orange-500">12</div>
              <div className="text-sm text-gray-400">Review</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">60</div>
              <div className="text-sm text-gray-400">Learned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">150</div>
              <div className="text-sm text-gray-400">Cards</div>
            </div>
          </div>

          {/* Phần Hành Động (Call to Action) */}
          <div className="flex gap-3">
            <Button color="primary" fullWidth>
              <PlayIcon size={18} />
              Review (12)
            </Button>

            <Button variant="bordered" className="text-black" fullWidth>
              Learn new
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default FlashCard 
