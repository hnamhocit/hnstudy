import { Select, SelectItem } from "@heroui/react"
import axios from "axios"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

const defaultLanguages = [
  { code: "en", name: "English" },
  { code: "vi", name: "Vietnamese" },
  { code: "zh-Hans", name: "Chinese Simplified" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
]

interface LanguagesProps {
  fromLang: string
  toLang: string
  setFromLang: Dispatch<SetStateAction<string>>
  setToLang: Dispatch<SetStateAction<string>>
  isOpen: boolean
}

const Languages: FC<LanguagesProps> = ({ fromLang, toLang, setFromLang, setToLang, isOpen }) => {
  const [languages, setLanguages] = useState(defaultLanguages)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data } = await axios.get(
          "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0"
        )

        if (data.translation) {
          const langList = Object.entries(data.translation).map(([code, info]: [string, any]) => ({
            code,
            name: info.name
          }))

          setLanguages(langList)
        }
      } catch (error) {
        console.log("Using default languages due to error:", error)
      }
    }

    if (isOpen) {
      fetchLanguages()
    }
  }, [isOpen])

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

export default Languages 
