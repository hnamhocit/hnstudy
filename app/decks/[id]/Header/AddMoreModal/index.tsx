import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"
import { Table } from "lucide-react"

const AddMoreModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpenChange} startContent={<Table size={20} />} variant="faded">Add more</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddMoreModal 
