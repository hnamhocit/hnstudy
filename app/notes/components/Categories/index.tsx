import { getCategoryColor } from "@/utils"
import { Card, CardBody } from "@heroui/react"
import { FC } from "react"

const categories = [
  { name: "Tất cả", count: 12, color: "bg-gray-500" },
  { name: "Lập trình", count: 5, color: "bg-blue-500" },
  { name: "Tiếng Anh", count: 4, color: "bg-green-500" },
  { name: "Toán học", count: 2, color: "bg-purple-500" },
  { name: "Khoa học", count: 1, color: "bg-orange-500" }
]

interface CategoriesProps {
  categories: { name: string, count: number }[]
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
  return (
    <Card>
      <CardBody className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Danh mục
        </h3>

        <div className="space-y-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className='w-3 h-3 rounded-full' style={{
                  backgroundColor: getCategoryColor(category.name)
                }}></div>

                <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
              </div>

              <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded-full">
                {category.count}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default Categories 
