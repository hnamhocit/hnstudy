import { Button, Card, CardBody } from "@heroui/react"
import { Bookmark, Calendar, FileText } from "lucide-react"
import moment from 'moment'
import { FC } from "react"

import { INote } from "@/interfaces/note"
import { getCategoryColor } from "@/utils"
import Link from "next/link"

const Note: FC<INote> = ({ id, title, content, tags, createdAt, category }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 group">
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-4 h-4 rounded-full blue-blue-500 mt-1`} style={{
            backgroundColor: getCategoryColor(category)
          }}></div>

          <Button isIconOnly variant="light" size="sm">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>

        <Link href={`/notes/${id}`} className="font-semibold text-gray-900 dark:text-white mb-2 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </Link>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {content}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />

            {moment(createdAt).format('DD/MM/YYYY')}
          </span>

          <span className="flex items-center gap-1">
            <FileText className="w-3 h-3" />

            Đã chỉnh sửa
          </span>
        </div>
      </CardBody>
    </Card>
  )
}

export default Note 
