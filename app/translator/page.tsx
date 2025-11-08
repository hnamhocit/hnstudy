"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Progress, Slider } from "@heroui/react"
import { SquareArrowOutUpRight, Plus, Search, Settings2Icon } from "lucide-react"
import { collection, onSnapshot, query, where } from "firebase/firestore"

import { auth, db } from "@/config"
import { IDesk } from "@/interfaces"
import StatsCard from "./StatsCard"
import DefaultLayout from "@/layouts/DefaultLayout"
import CircularProgress from "./CircularProgress"

const Translator = () => {
    const router = useRouter()
    const user = auth.currentUser

    const [decks, setDecks] = useState<IDesk[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            setIsLoading(false)
            return
        }

        const q = query(collection(db, "decks"), where("ownerId", "==", user.uid))

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                const fetchedDecks: IDesk[] = []
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    fetchedDecks.push({
                        ...data,
                        id: doc.id,
                        createdAt: (data.createdAt as any).toDate(),
                        updatedAt: (data.updatedAt as any).toDate(),
                    } as IDesk)
                })
                setDecks(fetchedDecks)
                setIsLoading(false)
            },
            (error) => {
                console.error("Lỗi khi fetch bộ thẻ: ", error)
                setIsLoading(false)
            }
        )

        return () => unsubscribe()
    }, [user])

    const handleNewDeck = () => {
        router.push("/desks/new")
    }

    if (isLoading) {
        return (
            <DefaultLayout>
                <div className="text-white text-center p-10">Đang tải bộ thẻ...</div>
            </DefaultLayout>
        )
    }

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-12">
                <div className="grid grid-cols-4 gap-4">

                    <StatsCard color="blue" />
                    <StatsCard color="green" />
                    <StatsCard color="purple" />
                    <StatsCard color="orange" />

                </div>

                <div className="flex items-center justify-between">
                    <div className="p-2 rounded-2xl bg-neutral-700">
                        <Button variant="light" size="sm">My flashcard</Button>
                        <Button variant="light" size="sm">Explore</Button>
                        <Button variant="light" size="sm">Learned</Button>
                    </div>

                    <div className="flex items-center gap-3">
                        <Input startContent={<Search size={18} />} placeholder="Enter here..." />

                        <button className="flex items-center shrink-0 gap-2 py-2 px-3 text-sm rounded-md bg-blue-500 text-white">
                            <Plus size={18} />
                            <div>New desk</div>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-md border-2 space-y-4 border-neutral-700/50 bg-neutral-900/50">
                        <div>
                            <div className="text-xl font-bold">TOEIC BASIC</div>
                            <div className="flex items-center justify-between">
                                <div className="text-sm">No description</div>
                                <div className="text-xs py-1 px-3 rounded-full bg-neutral-950">3 words</div>
                            </div>
                        </div>

                        <div className="grid gap-4 grid-cols-4">
                            <div className="flex flex-col gap-3 items-center">
                                <CircularProgress
                                    strokeWidth={6}
                                    size={64}
                                    progress={64}
                                    trackColor="text-green-700/50"
                                    progressColor="text-green-500"
                                    text="0"
                                />

                                <div className="text-sm font-medium text-green-500">Learned</div>
                            </div>

                            <div className="flex flex-col gap-3 items-center">
                                <CircularProgress
                                    strokeWidth={6}
                                    size={64}
                                    progress={64}
                                    trackColor="text-purple-700/50"
                                    progressColor="text-purple-500"
                                    text="0"
                                />

                                <div className="text-sm font-medium text-purple-500">Learning</div>
                            </div>

                            <div className="flex flex-col gap-3 items-center">
                                <CircularProgress
                                    strokeWidth={6}
                                    size={64}
                                    progress={64}
                                    trackColor="text-orange-700/50"
                                    progressColor="text-orange-500"
                                    text="0"
                                />

                                <div className="text-sm font-medium text-orange-500">New words</div>
                            </div>

                            <div className="flex flex-col gap-3 items-center">
                                <CircularProgress
                                    strokeWidth={6}
                                    size={64}
                                    progress={64}
                                    trackColor="text-indigo-700/50"
                                    progressColor="text-indigo-500"
                                />

                                <div className="text-sm font-medium text-indigo-500">Proportion</div>
                            </div>


                        </div>

                        <div className="space-y-2">
                            <div className="text-sm text-gray-300">Progress: <span className="font-medium text-blue-500">70%</span></div>
                            <Progress value={70} className="h-1" />
                        </div>


                        <div className="flex gap-3">
                            <Button fullWidth variant="faded" startContent={
                                <SquareArrowOutUpRight />
                            }>
                                Enter
                            </Button>

                            <Button isIconOnly variant="faded">
                                <Settings2Icon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Translator
