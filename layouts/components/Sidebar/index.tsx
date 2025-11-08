import {Avatar, Button} from "@heroui/react"
import clsx from "clsx"
import Link from "next/link"
import {
    CalendarDaysIcon,
    ChartPieIcon,
    DatabaseIcon,
    LanguagesIcon,
    LayoutGrid,
    NotebookPenIcon,
    SettingsIcon
} from "lucide-react";
import {usePathname} from "next/navigation";

const pages = [
    {
        href: "/",
        icon: <LayoutGrid size={20}/>
    },
    {
        href: "/translator",
        icon: <LanguagesIcon size={20}/>
    },
    {
        href: "/calendar",
        icon: <CalendarDaysIcon size={20}/>
    },
    {
        href: "/notes",
        icon: <NotebookPenIcon size={20}/>
    },
    {
        href: "/storage",
        icon: <DatabaseIcon size={20}/>
    },
    {
        href: "/analytics",
        icon: <ChartPieIcon size={20}/>
    }
]

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className="shrink-0 w-16 flex flex-col border-r border-neutral-700 justify-between items-center py-4">
            <Avatar src="https://i.pinimg.com/736x/96/27/d6/9627d61c2f84543ade88c42aa6a9cff8.jpg" alt=""/>

            <div className="flex flex-col gap-4">
                {pages.map(page => (
                    <Link href={page.href} key={page.href}
                          className={clsx("block rounded-2xl p-2 transition-all hover:bg-blue-500 hover:text-white", pathname === page.href && "bg-blue-500 text-white")}>
                        {page.icon}
                    </Link>
                ))}
            </div>

            <Button isIconOnly variant="light">
                <SettingsIcon size={20}/>
            </Button>
        </div>
    )
}

export default Sidebar 
