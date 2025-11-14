import { FC } from "react"
import { SelectedItems } from "@/stores"

interface StatusProps {
  selected: SelectedItems
}

const Status: FC<StatusProps> = ({ selected }) => {
  return (
    <div className="p-3 bg-neutral-50 rounded-lg">
      <div className="text-sm text-gray-600">
        <div>Selected Part of Speech: <strong>{selected.partOfSpeech || "None"}</strong></div>
        <div>Selected Pronunciation: <strong>{selected.phonetic ? (selected.phonetic.text || "Audio only") : "None"}</strong></div>
      </div>
    </div>
  )
}

export default Status
