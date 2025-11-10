import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, useDisclosure } from "@heroui/react"
import axios from "axios"
import { Headphones, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import AudioButton from "../AudioButton"
import Link from "next/link"

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

interface Phonetic {
  text?: string
  audio: string
  sourceUrl: string
}

interface Meaning {
  partOfSpeech: string
  definitions: string[]
}

const AddCardModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [front, setFront] = useState("")
  const [fromLang, setFromLang] = useState("en")
  const [toLang, setToLang] = useState("vi")
  const [languages, setLanguages] = useState(defaultLanguages)
  const [phonetics, setPhonetics] = useState<Phonetic[]>([])
  const [partsOfSpeech, setPartsOfSpeech] = useState<string[]>([])

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

  const handleAddCard = async () => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${fromLang}/${front}`)
    const data = await response.json()

    const document = data[0]
    const meanings = document.meanings as Meaning[]
    const phonetics = document.phonetics as Phonetic[]

    setPartsOfSpeech(meanings.map((meaning) => meaning.partOfSpeech))
    setPhonetics(phonetics.filter(p => p.audio.length > 0))

    setFront("")
    setFromLang("en")
    setToLang("vi")
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
              <ModalHeader>Add card</ModalHeader>
              <ModalBody className="gap-4 pb-6">
                <Input
                  value={front}
                  onValueChange={setFront}
                  label="Word"
                  placeholder="Enter word or phrase..."
                />

                <div className="flex gap-3">
                  <Select
                    label="From language"
                    selectedKeys={[fromLang]}
                    onSelectionChange={(keys) => setFromLang(Array.from(keys)[0] as string)}
                    className="flex-1"
                  >
                    {languages.map((lang) => (
                      <SelectItem key={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="To language"
                    selectedKeys={[toLang]}
                    onSelectionChange={(keys) => setToLang(Array.from(keys)[0] as string)}
                    className="flex-1"
                  >
                    {languages.map((lang) => (
                      <SelectItem key={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  {partsOfSpeech.map(pos => <button key={pos} className="block text-sm font-medium py-1 px-3 bg-neutral-700 border border-neutral-900/20 rounded-full">{pos}</button>)}
                </div>

                {phonetics.map((p, i) => <div key={i} className="p-4 bg-neutral-900 border-neutral-700 border rounded-2xl space-y-2">
                  <div className="text-lg font-semibold text-white">{p.text}</div>
                  <Link href={p.sourceUrl} target="_blank" className="block text-sm text-blue-500 font-medium underline">{p.sourceUrl}</Link>
                  <AudioButton src={p.audio} />
                </div>)}

                <div className="flex gap-2 justify-end">
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>

                  <Button
                    color="primary"
                    onPress={handleAddCard}
                    isDisabled={!front.trim()}
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
