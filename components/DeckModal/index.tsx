import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@heroui/react"
import { useEffect, useState } from "react"

import Selectable from "./Selectable"
import { deckController } from "@/controllers"
import { IDeck } from "@/interfaces"

interface DeckModalProps {
  mode: 'create' | 'update'
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  deck?: IDeck
}

const DeckModal = ({ mode, isOpen, onOpenChange, deck }: DeckModalProps) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && deck) {
        setName(deck.name)
        setDescription(deck.description)
        setIsPublic(deck.isPublic)
      } else {
        setName("")
        setDescription("")
        setIsPublic(true)
      }
    }
  }, [isOpen, mode, deck])

  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      if (mode === 'create') {
        await deckController.create(name, description, isPublic)
      } else if (mode === 'update' && deck) {
        await deckController.update(deck.id, { name, description, isPublic })
      }

      setName("")
      setDescription("")
      onOpenChange(false)
    } catch (error) {
      console.log(`${mode} deck error: `, error)
    } finally {
      setIsLoading(false)
    }
  }

  const title = mode === 'create' ? 'Add new deck' : 'Update deck'
  const submitText = mode === 'create' ? 'Create' : 'Update'

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>

        <ModalBody>
          <Input
            label="Name"
            value={name}
            onValueChange={setName}
            placeholder="Enter deck name"
          />

          <Textarea
            label="Description"
            value={description}
            onValueChange={setDescription}
            placeholder="Enter deck description"
          />

          <div className="text-sm font-medium">Permission</div>

          <div className="space-y-2">
            <Selectable
              isSelected={isPublic}
              onChange={() => setIsPublic(true)}
              name="public"
              description="Anyone can view this deck"
            />

            <Selectable
              isSelected={!isPublic}
              onChange={() => setIsPublic(false)}
              name="private"
              description="Only you can view this deck"
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            onPress={() => onOpenChange(false)}
            fullWidth
            variant="faded"
            isDisabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            onPress={handleSubmit}
            fullWidth
            color="primary"
            isLoading={isLoading}
            isDisabled={!name.trim()}
          >
            {submitText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeckModal
