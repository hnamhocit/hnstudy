import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Select,
  SelectItem
} from "@heroui/react"
import { useEffect, useState } from "react"
import { cardController } from "@/controllers"
import { ICard, IExample, CardStatus } from "@/interfaces"

interface UpdateCardModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  deckId: string
  card: ICard
}

const UpdateCardModal = ({ isOpen, onOpenChange, deckId, card }: UpdateCardModalProps) => {
  const [formData, setFormData] = useState({
    front: "",
    phonetic: "",
    audio: "",
    sourceUrl: "",
    pos: "",
    definition: "",
    note: "",
    examples: [] as IExample[],
    status: "new" as CardStatus
  })
  const [isLoading, setIsLoading] = useState(false)

  // Part of Speech options
  const posOptions = [
    { label: "Noun", value: "noun" },
    { label: "Verb", value: "verb" },
    { label: "Adjective", value: "adjective" },
    { label: "Adverb", value: "adverb" },
    { label: "Preposition", value: "preposition" },
    { label: "Conjunction", value: "conjunction" },
    { label: "Interjection", value: "interjection" },
    { label: "Pronoun", value: "pronoun" },
    { label: "Other", value: "other" }
  ]

  useEffect(() => {
    if (isOpen) {
      setFormData({
        front: card.front || "",
        phonetic: card.phonetic || "",
        audio: card.audio || "",
        sourceUrl: card.sourceUrl || "",
        pos: card.pos || "",
        definition: card.definition || "",
        note: card.note || "",
        examples: card.examples || [],
        status: card.status || "new"
      })
    }

  }, [isOpen, card])

  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      await cardController.update(deckId, card.id, formData)

      onOpenChange(false)
    } catch (error) {
      console.log(`update card error: `, error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleExampleChange = (index: number, field: keyof IExample, value: string) => {
    const newExamples = [...formData.examples]
    if (!newExamples[index]) {
      newExamples[index] = { from: "", to: "" }
    }
    newExamples[index][field] = value
    handleInputChange('examples', newExamples)
  }

  const addExample = () => {
    handleInputChange('examples', [...formData.examples, { sentence: "", translation: "" }])
  }

  const removeExample = (index: number) => {
    const newExamples = formData.examples.filter((_, i) => i !== index)
    handleInputChange('examples', newExamples)
  }


  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>Edit card</ModalHeader>

        <ModalBody className="max-h-[70vh] overflow-y-auto">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Front *"
              value={formData.front}
              onValueChange={(value) => handleInputChange('front', value)}
              placeholder="Word, phrase, or question"
              isRequired
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Phonetic"
                value={formData.phonetic}
                onValueChange={(value) => handleInputChange('phonetic', value)}
                placeholder="/fəˈnɛtɪk/"
              />

              <Input
                label="Audio URL"
                value={formData.audio}
                onValueChange={(value) => handleInputChange('audio', value)}
                placeholder="https://example.com/audio.mp3"
              />
            </div>

            {/* Part of Speech & Status */}
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Part of Speech"
                selectedKeys={[formData.pos]}
                onChange={(e) => handleInputChange('pos', e.target.value)}
              >
                {posOptions.map((pos) => (
                  <SelectItem key={pos.value}>
                    {pos.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Source URL"
                value={formData.sourceUrl}
                onValueChange={(value) => handleInputChange('sourceUrl', value)}
                placeholder="https://example.com/source"
              />
            </div>

            {/* Definition & Note */}
            <Textarea
              label="Definition"
              value={formData.definition}
              onValueChange={(value) => handleInputChange('definition', value)}
              placeholder="Detailed definition..."
              minRows={2}
            />

            <Textarea
              label="Note"
              value={formData.note}
              onValueChange={(value) => handleInputChange('note', value)}
              placeholder="Personal notes, tips, or mnemonics..."
              minRows={2}
            />


            {/* Examples Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Examples</span>

                <Button size="sm" onPress={addExample}>
                  Add Example
                </Button>
              </div>

              {formData.examples.map((example, index) => (
                <div key={index} className="p-3 border rounded-lg space-y-2 border-neutral-700">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Example {index + 1}</span>

                    <Button
                      size="sm"
                      color="danger"
                      variant="light"
                      onPress={() => removeExample(index)}
                    >
                      Remove
                    </Button>
                  </div>

                  <Textarea
                    label="Sentence"
                    value={example.from}
                    onValueChange={(value) => handleExampleChange(index, 'from', value)}
                    placeholder="Example sentence..."
                    minRows={1}
                  />

                  <Input
                    label="Translation"
                    value={example.to}
                    onValueChange={(value) => handleExampleChange(index, 'to', value)}
                    placeholder="Translation..."
                  />
                </div>
              ))}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            onPress={() => onOpenChange(false)}
            variant="faded"
            isDisabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            onPress={handleSubmit}
            color="primary"
            isLoading={isLoading}
            isDisabled={!formData.front.trim() || !formData.definition.trim()}
          >
            Update card
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateCardModal
