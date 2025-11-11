import { Select, SelectItem } from "@heroui/react"
import { Dispatch, FC, SetStateAction } from "react"

interface LanguagesSelectionProps {
  fromLang: string
  toLang: string
  setFromLang: Dispatch<SetStateAction<string>>
  setToLang: Dispatch<SetStateAction<string>>
  languages: { code: string, name: string }[]
}

const LanguagesSelection: FC<LanguagesSelectionProps> = ({ fromLang, toLang, setFromLang, setToLang, languages }) => {
  return (
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
  )
}

export default LanguagesSelection
