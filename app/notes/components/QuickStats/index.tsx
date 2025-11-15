import { Card, CardBody } from "@heroui/react"

const QuickStats = () => {
  return (
    <Card className="bg-linear-to-r from-blue-500 to-cyan-500 text-white">
      <CardBody className="p-6">
        <h3 className="font-semibold mb-4">Thống kê</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Tổng ghi chú:</span>
            <span className="font-semibold">12</span>
          </div>

          <div className="flex justify-between">
            <span>Đã gắn dấu:</span>
            <span className="font-semibold">8</span>
          </div>

          <div className="flex justify-between">
            <span>Tuần này:</span>
            <span className="font-semibold">3</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default QuickStats 
