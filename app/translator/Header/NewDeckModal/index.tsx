import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@heroui/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

import Selectable from "./Selectable"
import { IDeck } from "@/interfaces"
import { useUserStore } from "@/stores"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/config"

const NewDeckModal = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { user } = useUserStore()

  const handleCreate = async () => {
    try {
      setIsDisabled(true)

      const id = uuidv4()

      const date = new Date()
      const newDeskData: IDeck = {
        id,
        createdAt: date,
        updatedAt: date,
        name,
        description,
        isPublic,
        wordCount: 0,
        userId: user?.id as string,
      }

      await setDoc(doc(db, "decks", id), newDeskData)
      setName("")
      setDescription("")
    } catch (error) {
      console.log("Create desk error: ", error)
    } finally {
      setIsDisabled(false)
    }
  }

  return (
    <>
      <button onClick={onOpen} className="flex items-center shrink-0 gap-2 py-2 px-3 text-sm rounded-md bg-blue-500 text-white">
        <Plus size={18} />
        <div>New desk</div>
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add new desk</ModalHeader>

          <ModalBody>

            <Input label="Name" value={name} onValueChange={setName} />

            <Textarea label="Description" value={description} onValueChange={setDescription} />

            <div>Permission</div>

            <Selectable isOpen={isPublic} onChange={() => setIsPublic(true)} name="public" />
            <Selectable isOpen={!isPublic} onChange={() => setIsPublic(false)} name="private" />

          </ModalBody>

          <ModalFooter>
            <Button isLoading={isDisabled} fullWidth variant="faded">Cancel</Button>
            <Button isLoading={isDisabled} onPress={handleCreate} fullWidth color="primary">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewDeckModal 
