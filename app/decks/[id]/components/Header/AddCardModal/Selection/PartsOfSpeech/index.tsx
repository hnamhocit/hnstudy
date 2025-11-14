import { FC } from "react"
import { Check } from "lucide-react"
import { Meaning, SelectedItems } from "@/stores"

interface PartsOfSpeechProps {
  meanings: Meaning[]
  onChange: (value: string) => void
  selected: SelectedItems
}

const PartsOfSpeech: FC<PartsOfSpeechProps> = ({ meanings, onChange, selected }) => {
  return (
    <div className="space-y-3">
      <h4 className="font-medium">Select Part of Speech:</h4>
      <div className="flex flex-wrap gap-2">
        {meanings.map((meaning, index) => (
          <button
            key={index}
            onClick={() => onChange(meaning.partOfSpeech)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-colors ${selected.partOfSpeech === meaning.partOfSpeech
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-neutral-700 border-gray-900/20 hover:bg-blue-500 hover:border-blue-500"
              }`}
          >
            {meaning.partOfSpeech}
            {selected.partOfSpeech === meaning.partOfSpeech && (
              <Check size={16} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PartsOfSpeech
