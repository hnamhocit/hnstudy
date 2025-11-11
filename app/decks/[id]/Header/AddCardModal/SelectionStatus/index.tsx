import { FC } from "react"
import { SelectedItems } from ".."

interface SelectionStatusProps {
  selected: SelectedItems
}

const SelectionStatus: FC<SelectionStatusProps> = ({ selected }) => {
  return (
    <div className="p-3 bg-neutral-50 rounded-lg">
      <div className="text-sm text-gray-600">
        <div>Selected Part of Speech: <strong>{selected.partOfSpeech || "None"}</strong></div>
        <div>Selected Pronunciation: <strong>{selected.phonetic ? (selected.phonetic.text || "Audio only") : "None"}</strong></div>
      </div>
    </div>
  )
}

export default SelectionStatus
