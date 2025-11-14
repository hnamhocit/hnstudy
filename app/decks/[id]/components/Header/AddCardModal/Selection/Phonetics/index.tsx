import { FC } from "react"
import Link from "next/link"
import { Check } from "lucide-react"

import { Phonetic, SelectedItems } from "@/stores"
import AudioButton from "../../../AudioButton"

interface PhoneticsProps {
  phonetics: Phonetic[]
  selected: SelectedItems
  onChange: (phonetic: Phonetic) => void
}

const Phonetics: FC<PhoneticsProps> = ({ phonetics, selected, onChange }) => {
  return (
    <div className="space-y-3">
      <h4 className="font-medium">Select Pronunciation:</h4>
      <div className="space-y-2">
        {phonetics.map((phonetic, index) => (
          <div
            key={index}
            onClick={() => onChange(phonetic)}
            className={`p-3 rounded-xl border transition-colors cursor-pointer ${selected.phonetic?.audio === phonetic.audio
              ? "bg-blue-500/50 border-blue-900/20"
              : "bg-neutral-700 border-neutral-900/20"
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-lg font-semibold">
                  {phonetic.text || "No phonetic text"}
                </div>
                {phonetic.sourceUrl && (
                  <Link
                    href={phonetic.sourceUrl}
                    target="_blank"
                    className="block text-sm text-blue-500 font-medium underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Source
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-2">
                <AudioButton src={phonetic.audio} />
                {selected.phonetic?.audio === phonetic.audio && (
                  <Check size={20} className="text-blue-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Phonetics 
