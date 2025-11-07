"use client"

import {addToast, Button, Input, Textarea} from "@heroui/react"
import {useState} from "react"
import {v4 as uuidv4} from "uuid"
import {TrashIcon} from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';
import {Timestamp, writeBatch} from "@firebase/firestore";
import {db} from "@/config";
import {doc, serverTimestamp} from "firebase/firestore";
import {useRouter} from 'next/navigation'

import BatchWrites from "./BatchWrites"
import {ICard, IDesk} from "@/interfaces";
import {createNewCard} from "@/utils";
import DefaultLayout from "@/layouts/DefaultLayout"
import {useUserStore} from "@/stores";

const NewDesk = () => {
    const newDeskId = uuidv4()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const [cards, setCards] = useState<ICard[]>([
        createNewCard(newDeskId, "", "")
    ])

    const {user} = useUserStore()
    const router = useRouter()

    const handleUpdateCard = (
        id: string,
        field: "front" | "back",
        value: string
    ) => {
        setCards((prev) =>
            prev.map((card) =>
                card.id === id ? {...card, [field]: value, updatedAt: new Date()} : card
            )
        )
    }

    const handleSubmit = async () => {
        setIsDisabled(true)
        addToast({title: "Saving...",})

        if (!user) {
            addToast({
                title: "U need authorized to continue",
                color: "danger"
            })
            setIsDisabled(false);
            return;
        }

        if (title.trim().length < 3) {
            addToast({
                title: "Title must be at least 3 characters",
                color: "danger"
            })
            setIsDisabled(false);
            return;
        }
        const validCards = cards.filter(c => c.front.trim() !== "" && c.back.trim() !== "");
        if (validCards.length === 0) {
            addToast({
                title: "At least one valid card (include front and back)",
                color: "danger"
            })
            setIsDisabled(false);
            return;
        }

        try {
            const batch = writeBatch(db);

            const deckRef = doc(db, "Decks", newDeskId);
            const newDeckData: IDesk = {
                id: newDeskId,
                ownerId: user.id,
                name: title,
                description: description,
                createdAt: serverTimestamp() as unknown as Date,
                updatedAt: serverTimestamp() as unknown as Date,
                stats: {
                    totalCards: validCards.length,
                    dueCards: validCards.length,
                    learnedCards: 0,
                }
            };
            batch.set(deckRef, newDeckData);

            for (const card of validCards) {
                const cardRef = doc(db, "Decks", newDeskId, "Cards", card.id);

                const cardData = {
                    ...card,
                    createdAt: Timestamp.fromDate(card.createdAt as Date),
                    updatedAt: serverTimestamp(),
                    nextReviewDate: Timestamp.fromDate(card.nextReviewDate as Date),
                };

                batch.set(cardRef, cardData);
            }

            await batch.commit();

            addToast({
                title: "Create desk successfully",
                color: "success",
            })

            router.push("/flash-card");
        } catch (error) {
            console.error("Lỗi khi tạo bộ thẻ:", error);
            setIsDisabled(false);
        }
    }

    return (
        <DefaultLayout>
            <div className="container mx-auto">

                <div className="space-y-4 mb-8">
                    <Input value={title} onValueChange={setTitle} label="Tên Bộ Thẻ (Title)" variant="bordered"/>
                    <Textarea value={description} onValueChange={setDescription} label="Mô Tả (Description)"
                              variant="bordered"/>
                </div>

                <BatchWrites cards={cards} setCards={setCards} newDeskId={newDeskId}/>

                {/* NỘI DUNG TAB 1: THÊM THỦ CÔNG */}
                <div className="py-6 grid grid-cols-4 gap-4">
                    {cards.map((card, i) => (
                        <div key={card.id} className="relative flex flex-col gap-4 p-4 bg-white rounded-lg">
                            <span className="text-lg font-bold text-gray-500">{i + 1}</span>

                            <TextareaAutosize onChange={(e) => {
                                handleUpdateCard(card.id, "front", e.target.value)
                            }} placeholder="Front..."
                                              className="block p-2 resize-none outline-none text-black"/>

                            <div className="h-0.5 w-full bg-gray-200"></div>

                            <TextareaAutosize onChange={e => {
                                handleUpdateCard(card.id, "back", e.target.value)
                            }} placeholder="Back..."
                                              className="block p-2 resize-none outline-none text-black"/>

                            <div className="absolute top-1 right-1">

                                <Button variant="light" onPress={() => {
                                    setCards(prev => prev.filter(c => c.id !== card.id))
                                }} color="danger" isIconOnly> <TrashIcon size={20}/> </Button>
                            </div>

                        </div>
                    ))}


                    {/* Nút thêm mới */}
                    <Button onPress={() => setCards(prev => [
                        ...prev,
                        createNewCard(newDeskId, "", "")
                    ])} color="primary" variant="ghost" fullWidth>
                        + Thêm Thẻ Mới
                    </Button>
                </div>

                <div className="flex justify-end">
                    <Button onPress={handleSubmit} isLoading={isDisabled} color="primary">Submit</Button>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default NewDesk
