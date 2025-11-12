import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"
import { Plus } from "lucide-react"
import { useState, Dispatch, SetStateAction, FC } from "react"
import { v4 as uuidv4 } from 'uuid'

import Languages from "./Languages"
import Selection from "./Selection"
import { ICard } from "@/interfaces"
import { findBestTFIDFMatch } from "@/utils"
import { useCardStore } from "@/stores"

const AddCardModal: FC<{ id: string; setCards: Dispatch<SetStateAction<ICard[]>> }> =
  ({ setCards, id }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { front, setMeanings, setPhonetics, setSelected, meanings, selected, examples, note, setFront } = useCardStore()

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

        setIsSelecting(true)  // → chuyển sang screen 2
        setSelected({ partOfSpeech: null, phonetic: null })
      } catch (error) {
        console.error("Lookup error:", error)
      }
    }

    const handleAddCard = () => {
      if (!selected.partOfSpeech || !selected.phonetic) return

      const definitions = meanings
        .find(m => m.partOfSpeech === selected.partOfSpeech)!
        .definitions.map(d => d.definition)

      const result = findBestTFIDFMatch(front, definitions)

      const date = new Date()

      setCards(prev => [
        ...prev,
        {
          id: uuidv4(),
          front,
          back: "",
          deckId: id,
          phonetic: selected.phonetic!.text,
          sourceUrl: selected.phonetic!.sourceUrl,
          audio: selected.phonetic!.audio,
          pos: selected.partOfSpeech!,
          definition: result.definition,
          examples,
          note,
          nextReviewDate: date,
          interval: 0,
          easeFactor: 2.5,
          repetitions: 0,
          createdAt: date,
          updatedAt: date
        }
      ])

      // reset state
      setFront("")
      setFromLang("en")
      setToLang("vi")
      setMeanings([])
      setPhonetics([])
      setSelected({ partOfSpeech: null, phonetic: null })
      setIsSelecting(false)
    }

    return (
      <>
        <Button onPress={onOpen} startContent={<Plus size={20} />} variant="faded">
          Add
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
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
            )}
          </ModalContent>
        </Modal>
      </>
    )
  }

export default AddCardModal
