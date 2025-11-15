import { Card, CardBody, Skeleton } from "@heroui/react"
import { FC } from "react"

const NoteSkeleton: FC = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-6 h-6 rounded-lg" />
        </div>

        <Skeleton className="h-6 rounded-lg mb-2 w-3/4" />

        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 rounded-lg w-full" />
          <Skeleton className="h-4 rounded-lg w-4/5" />
          <Skeleton className="h-4 rounded-lg w-3/4" />
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <Skeleton className="h-6 rounded-full w-16" />
          <Skeleton className="h-6 rounded-full w-20" />
          <Skeleton className="h-6 rounded-full w-14" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 rounded-lg w-24" />
          <Skeleton className="h-4 rounded-lg w-20" />
        </div>
      </CardBody>
    </Card>
  )
}

export default NoteSkeleton
