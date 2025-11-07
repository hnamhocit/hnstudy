import { ReactNode } from "react"
import Sidebar from "./components/Sidebar"

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}

export default DefaultLayout
