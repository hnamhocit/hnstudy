import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"
import axios from "axios"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"

import PartsOfSpeechSelection from "./PartsOfSpeechSelection"
import PhoneticsSelection from "./PhoneticsSelection"
import SelectionStatus from "./SelectionStatus"
import LanguagesSelection from "./LanguagesSelection"

const defaultLanguages = [
  { code: "en", name: "English" },
  { code: "vi", name: "Vietnamese" },
  { code: "zh-Hans", name: "Chinese Simplified" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
]

export interface Phonetic {
  text?: string
  audio: string
  sourceUrl: string
}

export interface Meaning {
  partOfSpeech: string
  definitions: string[]
}

export interface SelectedItems {
  partOfSpeech: string | null
  phonetic: Phonetic | null
}

const AddCardModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [front, setFront] = useState("")
  const [fromLang, setFromLang] = useState("en")
  const [toLang, setToLang] = useState("vi")
  const [languages, setLanguages] = useState(defaultLanguages)
  const [phonetics, setPhonetics] = useState<Phonetic[]>([])
  const [meanings, setMeanings] = useState<Meaning[]>([])

  const [selected, setSelected] = useState<SelectedItems>({
    partOfSpeech: null,
    phonetic: null
  })

  const [isSelecting, setIsSelecting] = useState(false)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data } = await axios.get(
          "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0"
        )

        if (data.translation) {
          const langList = Object.entries(data.translation).map(([code, info]: [string, any]) => ({
            code,
            name: info.name
          }))

          setLanguages(langList)
        }
      } catch (error) {
        console.log("Using default languages due to error:", error)
      }
    }

    if (isOpen) {
      fetchLanguages()
    }
  }, [isOpen])

  const handleLookupWord = async () => {
    if (!front.trim()) return

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${fromLang}/${front}`)
      const data = await response.json()

      const document = data[0]
      const meaningsData = document.meanings as Meaning[]
      const phoneticsData = document.phonetics as Phonetic[]

      setMeanings(meaningsData)
      setPhonetics(phoneticsData.filter(p => p.audio && p.audio.length > 0))

      setIsSelecting(true)

      // Reset selected items
      setSelected({
        partOfSpeech: null,
        phonetic: null
      })
    } catch (error) {
      console.error("Failed to fetch word data:", error)
    }
  }

  const handleSelectPartOfSpeech = (pos: string) => {
    setSelected(prev => ({
      ...prev,
      partOfSpeech: prev.partOfSpeech === pos ? null : pos // Toggle selection
    }))
  }

  const handleSelectPhonetic = (phonetic: Phonetic) => {
    setSelected(prev => ({
      ...prev,
      phonetic: prev.phonetic?.audio === phonetic.audio ? null : phonetic // Toggle selection
    }))
  }

  const handleAddCard = () => {
    console.log("Adding card with:", {
      word: front,
      fromLang,
      toLang,
      selectedPartOfSpeech: selected.partOfSpeech,
      selectedPhonetic: selected.phonetic
    })

    // Reset everything
    setFront("")
    setFromLang("en")
    setToLang("vi")
    setMeanings([])
    setPhonetics([])
    setSelected({ partOfSpeech: null, phonetic: null })
    setIsSelecting(false)
  }

  const canAddCard = front.trim() && selected.partOfSpeech && selected.phonetic

  return (
    <>
      <Button onPress={onOpen} startContent={<Plus size={20} />} variant="faded">
        Add
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add card</ModalHeader>

              <ModalBody className="gap-4 pb-6">
                <Input
                  value={front}
                  onValueChange={setFront}
                  label="Word"
                  placeholder="Enter word or phrase..."
                />


                <LanguagesSelection fromLang={fromLang} toLang={toLang} setFromLang={setFromLang} setToLang={setToLang} languages={languages} />

                {/* Lookup Button - chỉ hiện khi có từ nhưng chưa lookup */}
                {front.trim() && !isSelecting && (
                  <Button
                    color="primary"
                    onPress={handleLookupWord}
                    className="w-full"
                  >
                    Lookup Word
                  </Button>
                )}


                {isSelecting && (
                  <>
                    {meanings.length > 0 && (
                      <PartsOfSpeechSelection
                        meanings={meanings}
                        onChange={handleSelectPartOfSpeech}
                        selected={selected}
                      />
                    )}

                    {phonetics.length > 0 && (
                      <PhoneticsSelection phonetics={phonetics} selected={selected} onChange={handleSelectPhonetic} />
                    )}

                    <SelectionStatus selected={selected} />
                  </>
                )}


                <div className="flex gap-2 justify-end">
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>

                  <Button
                    color="primary"
                    onPress={handleAddCard}
                    isDisabled={!canAddCard}
                  >
                    Add Card
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddCardModal
