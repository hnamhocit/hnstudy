import { Button, Card, CardBody } from '@heroui/react'
import clsx from 'clsx'
import {
	ArrowRight,
	Calendar,
	Flashlight,
	StickyNote,
	Timer,
} from 'lucide-react'
import { motion, Variants } from 'motion/react'
import { FC } from 'react'

const features = [
	{
		icon: <Flashlight className='w-7 h-7' />,
		title: 'Flashcards',
		description: 'Học với hệ thống thẻ thông minh và spaced repetition',
		color: 'from-blue-500 to-cyan-500',
		bg: 'bg-blue-50 dark:bg-blue-900/20',
		text: 'text-blue-600 dark:text-blue-400',
		href: '/translator',
	},
	{
		icon: <Timer className='w-7 h-7' />,
		title: 'Pomodoro',
		description: 'Quản lý thời gian học tập hiệu quả với kỹ thuật Pomodoro',
		color: 'from-green-500 to-emerald-500',
		bg: 'bg-green-50 dark:bg-green-900/20',
		text: 'text-green-600 dark:text-green-400',
		href: '/pomodoro',
	},
	{
		icon: <Calendar className='w-7 h-7' />,
		title: 'Lịch học',
		description: 'Lập kế hoạch học tập và theo dõi tiến độ',
		color: 'from-purple-500 to-pink-500',
		bg: 'bg-purple-50 dark:bg-purple-900/20',
		text: 'text-purple-600 dark:text-purple-400',
		href: '/calendar',
	},
	{
		icon: <StickyNote className='w-7 h-7' />,
		title: 'Ghi chú',
		description: 'Ghi chú thông minh với markdown và tìm kiếm',
		color: 'from-orange-500 to-red-500',
		bg: 'bg-orange-50 dark:bg-orange-900/20',
		text: 'text-orange-600 dark:text-orange-400',
		href: '/notes',
	},
]

interface ToolsProps {
	containerVariants: Variants
	itemVariants: Variants
}

const Tools: FC<ToolsProps> = ({ containerVariants, itemVariants }) => {
	return (
		<motion.div
			variants={containerVariants}
			className='lg:col-span-2 space-y-6'>
			<motion.div
				variants={itemVariants}
				className='flex items-center justify-between'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2'>
					<Flashlight className='w-6 h-6 text-yellow-500 fill-yellow-500' />
					Công cụ học tập
				</h2>

				<Button
					color='primary'
					variant='light'
					className='font-medium'
					endContent={<ArrowRight className='w-4 h-4' />}>
					Xem tất cả
				</Button>
			</motion.div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{features.map((feature, index) => (
					<motion.div
						key={index}
						variants={itemVariants}>
						<Card
							isPressable
							onPress={() =>
								(window.location.href = feature.href)
							}
							className='group border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-300 h-full w-full'>
							<CardBody className='p-6'>
								<div className='flex items-start justify-between mb-4'>
									<div
										className={clsx(
											'w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300',
											feature.bg,
											feature.text,
										)}>
										{feature.icon}
									</div>

									<div className='w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
										<ArrowRight className='w-4 h-4 text-gray-500' />
									</div>
								</div>

								<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
									{feature.title}
								</h3>

								<p className='text-gray-500 dark:text-gray-400 text-sm leading-relaxed'>
									{feature.description}
								</p>
							</CardBody>
						</Card>
					</motion.div>
				))}
			</div>
		</motion.div>
	)
}

export default Tools
