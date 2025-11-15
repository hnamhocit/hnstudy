import { Button } from "@heroui/react"
import { Plus } from "lucide-react"
import Link from "next/link"

const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Ghi chú
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400">
          Lưu trữ và quản lý kiến thức của bạn
        </p>
      </div>

      <Link href={`/notes/editor`}>
        <Button
          color="primary"
          startContent={<Plus className="w-5 h-5" />}
          className="bg-linear-to-r from-blue-500 to-purple-600 mt-4 lg:mt-0"
        >
          Tạo ghi chú mới
        </Button>
      </Link>
    </div>
  )
}

export default Header 
