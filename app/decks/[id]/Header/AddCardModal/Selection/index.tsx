import { useState } from "react"
import { Button, Input, Textarea } from "@heroui/react"

import PartsOfSpeech from "./PartsOfSpeech"
import Status from "./Status"
import Phonetics from "./Phonetics"
import { useCardStore } from "@/stores"


const Selection = () => {
  const { note, setNote, examples, setExamples, selected, setSelected, meanings, phonetics } = useCardStore()
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  const handleSelectPartOfSpeech = (pos: string) => {
    setSelected({
      ...selected,
      partOfSpeech: selected.partOfSpeech === pos ? null : pos
    })
  }

  const handleSelectPhonetic = (phonetic: any) => {
    setSelected({
      ...selected,
      phonetic: selected.phonetic?.audio === phonetic.audio ? null : phonetic
    })
  }

  const handleAddExample = () => {
    if (from.trim().length === 0 || to.trim().length === 0) return

    setExamples([...examples, { from, to }])
    setFrom("")
    setTo("")
  }

  return (
    <>
      {meanings.length > 0 && (
        <PartsOfSpeech
          meanings={meanings}
          onChange={handleSelectPartOfSpeech}
          selected={selected}
        />
      )}

      {phonetics.length > 0 && (
        <Phonetics phonetics={phonetics} selected={selected} onChange={handleSelectPhonetic} />
      )}

      <Status selected={selected} />

      <Textarea label="Note (optional)" value={note} onValueChange={setNote} />

      <div className="space-y-4">
        <div>Examples ({examples.length === 0 ? "Optional" : examples.length})</div>

        <div className="flex items-center gap-3">
          <Input label='From' value={from} onValueChange={setFrom} />
          <Input label='To' value={to} onValueChange={setTo} />
          <Button color="primary" onPress={handleAddExample}>Add</Button>
        </div>
      </div>
    </>
  )
}

export default Selection 
