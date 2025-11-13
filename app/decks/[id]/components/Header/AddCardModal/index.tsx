import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"
import { Plus } from "lucide-react"
import { useState, FC } from "react"
import { v4 as uuidv4 } from 'uuid'

import Languages from "./Languages"
import Selection from "./Selection"
import { findBestTFIDFMatch } from "@/utils"
import { useCardStore } from "@/stores"
import { useDeckCards } from "@/hooks/useDeckCards"
import axios from "axios"

interface AddCardModalProps {
  id: string
}

const AddCardModal: FC<AddCardModalProps> =
  ({ id }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { front, setMeanings, setPhonetics, setSelected, meanings, selected, examples, note, setFront, setNote, setExamples } = useCardStore()
    const { addCard } = useDeckCards(id)

    const [fromLang, setFromLang] = useState("en")
    const [toLang, setToLang] = useState("vi")
    const [isSelecting, setIsSelecting] = useState(false)

    const handleLookupWord = async () => {
      if (!front.trim()) return

      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${fromLang}/${front}`)
        const data = await response.json()

        const doc = data[0]

        setMeanings(doc.meanings)
        setPhonetics(
          doc.phonetics.filter((p: any) => p.audio?.length && p.text?.length)
        )

        setIsSelecting(true)
        setSelected({ partOfSpeech: null, phonetic: null })
      } catch (error) {
        console.error("Lookup error:", error)
      }
    }

    const handleAddCard = async () => {
      try {

        if (!selected.partOfSpeech || !selected.phonetic) return

        const definitions = meanings
          .find(m => m.partOfSpeech === selected.partOfSpeech)!
          .definitions.map(d => d.definition)

        const result = findBestTFIDFMatch(front, definitions)

        const { data } = await axios.post("/api/translate", {
          from: fromLang,
          to: toLang,
          text: result.definition
        })
        const translated = data[0].translations[0].text

        const date = new Date()

        await addCard({
          front,
          back: "",
          deckId: id,
          phonetic: selected.phonetic!.text,
          sourceUrl: selected.phonetic!.sourceUrl,
          audio: selected.phonetic!.audio,
          pos: selected.partOfSpeech!,
          definition: translated,
          examples,
          status: "new",
          note,
          nextReviewDate: date,
          interval: 0,
          easeFactor: 2.5,
          repetitions: 0,
          correctCount: 0,
          wrongCount: 0,
          streak: 0,
          createdAt: date,
          updatedAt: date
        })
      } catch (error: any) {
        addToast({
          title: error?.message,
          color: "danger"
        })
      } finally {
        // reset state
        setFront("")
        setNote("")
        setFromLang("en")
        setToLang("vi")
        setMeanings([])
        setPhonetics([])
        setExamples([])
        setSelected({ partOfSpeech: null, phonetic: null })
        setIsSelecting(false)
      }
    }

    return (
      <>
        <Button onPress={onOpen} startContent={<Plus size={20} />} variant="faded">
          Add
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <>
              <ModalHeader>Add Card</ModalHeader>

              <ModalBody className="gap-4 pb-6">

                {!isSelecting && (
                  <>
                    <Input
                      label="Word"
                      placeholder="Enter word..."
                      value={front}
                      onValueChange={setFront}
                    />

                    <Languages
                      fromLang={fromLang}
                      toLang={toLang}
                      setFromLang={setFromLang}
                      setToLang={setToLang}
                      isOpen={isOpen}
                    />

                    <Button
                      color="primary"
                      className="w-full"
                      onPress={handleLookupWord}
                      isDisabled={!front.trim()}
                    >
                      Lookup Word
                    </Button>
                  </>
                )}

                {isSelecting && (
                  <>
                    <Selection />

                    <div className="flex gap-2 justify-end mt-4">
                      <Button variant="light" onPress={() => setIsSelecting(false)}>
                        Back
                      </Button>

                      <Button
                        color="primary"
                        onPress={handleAddCard}
                        isDisabled={!selected.partOfSpeech || !selected.phonetic}
                      >
                        Add Card
                      </Button>
                    </div>
                  </>
                )}

              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default AddCardModal
