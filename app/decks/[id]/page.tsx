"use client"

import { doc, onSnapshot } from "firebase/firestore"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { db } from "@/config"
import { IDeck } from "@/interfaces"
import { Button, ButtonGroup, Input } from "@heroui/react"
import { BookOpen, Brain, ChevronLeft, Eye, Grid, List, Plus, RefreshCcw, Search, Share, Table, Trash, User, WalletCards, Webhook, ZapIcon } from "lucide-react"
import Header from "./Header"
import Stat from "./Stat"

const DeckDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [deck, setDeck] = useState<IDeck | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      setError("Invalid Desk ID.")
      return
    }

    const subscriber = onSnapshot(
      doc(db, "decks", id),

      (snapshot) => {
        if (!snapshot.exists()) {
          setIsLoading(false)
          setError("This flashcard is not exists or has been deleted")
          return
        }

        setError(null)
        const data = snapshot.data()
        setDeck(data as IDeck)
        setIsLoading(false)
      },

      (err) => {
        console.error("Firebase Snapshot Error:", err)
        setIsLoading(false)

        if (err.code === "permission-denied") {
          setError("You are not authorized to access this flashcard")
        } else {
          setError("Unknown error")
        }
      }
    )

    return () => subscriber()
  }, [id, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-3 max-w-sm w-full p-4">
          <h1 className="text-xl font-bold tex-red-500">{error}</h1>

          <Button
            radius="full"
            startContent={<ChevronLeft size={20} />}
            color="danger" onPress={() => router.back()}>Go back</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header name={deck?.name as string} description={deck?.description as string} />

      <div className="p-4 space-y-12">
        <div className="grid grid-cols-4 gap-7">
          <Stat label="Total" value={0} icon={<WalletCards size={32} />} className="text-gray-300 bg-gray-700/20" />
          <Stat label="Learned" value={0} icon={<BookOpen size={32} />} className="text-green-500 bg-green-900/20" />
          <Stat label="Learning" value={0} icon={<Brain size={32} />} className="text-blue-500 bg-blue-900/20" />
          <Stat label="Need to review" value={0} icon={<Webhook size={32} />} className="text-orange-500 bg-orange-900/20" />
        </div>

        <div className="flex items-center justify-between">
          <ButtonGroup size="lg" variant="bordered">
            <Button isIconOnly><Grid size={20} /></Button>
            <Button isIconOnly><List size={20} /></Button>
          </ButtonGroup>


          <div className="flex items-center gap-3">
            <Input startContent={<Search size={20} />} placeholder="Enter here" />

            <Button color="primary" variant="shadow" startContent={<ZapIcon size={20} />} className="shrink-0">Practice now</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeckDetails
