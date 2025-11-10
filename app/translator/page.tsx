"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"

import { IDeck } from "@/interfaces"
import DefaultLayout from "@/layouts/DefaultLayout"
import Stats from "./Stats"
import Header from "./Header"
import { auth, db } from "@/config"
import Deck from "./Deck"

const Translator = () => {
    const [decks, setDecks] = useState<IDeck[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const q = query(collection(db, "decks"), where("userId", "==", auth.currentUser?.uid))

        const subscriber = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data()) as IDeck[]
            setDecks(data)
            setIsLoading(false)
        })

        return () => subscriber()
    }, [])

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
                <Stats />

                <Header />

                <div className="grid grid-cols-3 gap-4">
                    {decks.map(deck => <Deck key={deck.id} {...deck} />)}
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Translator
