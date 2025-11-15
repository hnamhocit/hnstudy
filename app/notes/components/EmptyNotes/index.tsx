import { Card, CardBody, Button } from "@heroui/react"
import { FileText, Plus, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

const EmptyNotes = () => {
  const router = useRouter()

  return (
    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
      <CardBody className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <FileText className="w-16 h-16 text-gray-400" />
            <BookOpen className="w-8 h-8 text-blue-500 absolute -bottom-2 -right-2" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Chưa có ghi chú nào
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Bắt đầu hành trình học tập của bạn bằng cách tạo ghi chú đầu tiên.
          Lưu trữ kiến thức, ý tưởng và những điều quan trọng một cách dễ dàng.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={() => router.push('/notes/editor')}
            className="bg-linear-to-r from-blue-500 to-purple-600"
          >
            Tạo ghi chú đầu tiên
          </Button>

          <Button
            variant="bordered"
            onPress={() => router.push('/tutorial')}
          >
            Hướng dẫn sử dụng
          </Button>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            💡 Mẹo bắt đầu
          </h4>

          <ul className="text-sm text-blue-800 dark:text-blue-200 text-left space-y-1">
            <li>• Ghi chú giúp bạn ghi nhớ kiến thức lâu hơn</li>
            <li>• Sử dụng Markdown để định dạng ghi chú đẹp mắt</li>
            <li>• Thêm tags để dễ dàng tìm kiếm sau này</li>
          </ul>
        </div>
      </CardBody>
    </Card>
  )
}

export default EmptyNotes
