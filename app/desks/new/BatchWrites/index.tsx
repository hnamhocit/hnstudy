import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Select,
    SelectItem,
    Textarea,
    useDisclosure
} from "@heroui/react"
import axios from "axios"
import {BoxesIcon} from "lucide-react"
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react"
import {ICard} from "@/interfaces";
import {createNewCard} from "@/utils";

interface Language {
    code: string
    name: string
}

interface BatchWritesProps {
    cards: ICard[]
    setCards: Dispatch<SetStateAction<ICard[]>>
    newDeskId: string
}

const BatchWrites: FC<BatchWritesProps> = ({cards, setCards, newDeskId}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [languages, setLanguages] = useState<Language[]>([])
    const [isLoadingLang, setIsLoadingLang] = useState(false)
    const [fromLang, setFromLang] = useState(new Set(["en"]))
    const [toLang, setToLang] = useState(new Set(["vi"]))
    const [isTranslating, setIsTranslating] = useState(false)
    const [content, setContent] = useState("")

    useEffect(() => {
        const fetchLanguages = async () => {
            setIsLoadingLang(true)
            try {
                const res = await axios.get(
                    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0"
                )

                const langObject = res.data.translation
                const langArray: Language[] = Object.entries(
                    langObject
                ).map(([code, details]: [string, any]) => ({
                    code: code,
                    name: details.nativeName || details.name,
                }))

                setLanguages(langArray)
            } catch (error) {
                console.error("Lỗi khi fetch ngôn ngữ:", error)
            } finally {
                setIsLoadingLang(false)
            }
        }

        fetchLanguages()
    }, [])

    const handleTranslateAndAdd = async () => {
        setIsTranslating(true)

        try {
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    text: content,
                    from: Array.from(fromLang)[0],
                    to: Array.from(toLang)[0],
                }),
            })

            if (!response.ok) throw new Error("Lỗi API Dịch");

            const data = await response.json()
            const text = data[0].translations[0].text as string
            const words = text.split(",").map(t => t.trim()).filter(t => t.length > 0)
            const wordsToTranslate = content.split(",").map(t => t.trim()).filter(t => t.length > 0)

            const newCards: ICard[] = words.map((word, index) =>
                createNewCard(
                    newDeskId,
                    wordsToTranslate[index],
                    word
                )
            );

            if (cards.length === 1 && cards[0].front === "" && cards[0].back === "") {
                setCards(newCards);
            } else {
                setCards((prev) => [...prev, ...newCards]);
            }

            onOpenChange(); // Đóng modal
            setContent("");

        } catch (error) {
            console.error("Lỗi Dịch Hàng Loạt:", error);
        } finally {
            setIsTranslating(false);
        }
    }

    return (
        <>
            <Button onPress={onOpen} color="primary" startContent={
                <BoxesIcon size={20}/>
            }>
                Batch writes
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>Batch writes</ModalHeader>
                    <ModalBody>
                        <div className="flex items-center gap-3">
                            {/* SELECT 'FROM' (Đã kết nối) */}
                            <Select
                                label="From"
                                isLoading={isLoadingLang}
                                selectedKeys={fromLang}
                                onSelectionChange={(key) => setFromLang(new Set([key as string]))}
                            >
                                {languages.map((lang) => (
                                    <SelectItem key={lang.code}>
                                        {lang.name}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                label="To"
                                isLoading={isLoadingLang}
                                selectedKeys={toLang}
                                onSelectionChange={(key) => setToLang(new Set([key as string]))}
                            >
                                {languages.map((lang) => (
                                    <SelectItem key={lang.code}>
                                        {lang.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <Textarea value={content} onValueChange={setContent} label="Content"/>

                        <span className="text-xs font-medium">comma separated content</span>

                        <Button onPress={handleTranslateAndAdd} isLoading={isTranslating} color="primary">
                            Confirm
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )
}

export default BatchWrites 
