"use client"

import {useState} from "react"; // <-- Import hook
import {Button} from "@heroui/react";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import DefaultLayout from "@/layouts/DefaultLayout";

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date(new Date()));
    const [today] = useState(new Date()); // Ngày hôm nay thật

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const generateCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth(); // (0-11)

        // 0 - 6 ( 0 sunday )
        const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7;

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const calendarGrid = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            const day = daysInPrevMonth - firstDayOfMonth + 1 + i;
            calendarGrid.push({
                day,
                isCurrentMonth: false,
                key: `prev-${i}`
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = i === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

            calendarGrid.push({
                day: i,
                isCurrentMonth: true,
                isToday,
                key: `current-${i}`
            });
        }

        const totalCells = 42; // 6 hàng x 7 cột
        const remainingCells = totalCells - calendarGrid.length;
        for (let i = 1; i <= remainingCells; i++) {
            calendarGrid.push({
                day: i,
                isCurrentMonth: false,
                key: `next-${i}`
            });
        }

        return calendarGrid;
    };

    const calendarGrid = generateCalendarGrid();

    return (
        <DefaultLayout>
            <div className="p-4 bg-white rounded-2xl text-black max-w-100">
                <div className="flex items-center justify-between">

                    {/* Cập nhật header động */}
                    <div className="text-xl font-bold">
                        {currentDate.toLocaleString('default', {month: 'long', year: 'numeric'})}
                    </div>

                    <div className="flex items-center">
                        {/* Kết nối các nút bấm */}
                        <Button isIconOnly variant="light" className="text-black" onPress={handlePrevMonth}>
                            <ChevronLeftIcon size={20}/>
                        </Button>
                        <Button isIconOnly variant="light" className="text-black" onPress={handleNextMonth}>
                            <ChevronRightIcon size={20}/>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-7">
                    {days.map(day => (
                        <div key={day} className="p-2 font-medium text-center text-sm text-gray-500">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7">
                    {calendarGrid.map((cell) => {

                        let cellClasses = "h-10 w-10 flex items-center justify-center rounded-full cursor-pointer";

                        if (cell.isCurrentMonth) {
                            if (cell.isToday) {
                                cellClasses += " bg-blue-500 text-white font-bold hover:bg-blue-600";
                            } else {
                                cellClasses += " text-black hover:bg-gray-100";
                            }
                        } else {
                            cellClasses += " text-gray-300";
                        }

                        return (
                            <div key={cell.key} className={cellClasses}>
                                {cell.day}
                            </div>
                        );
                    })}
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Calendar;