import { Card, CardBody } from '@heroui/react'
import clsx from 'clsx'
import { BookOpen, StickyNote, Timer, TrendingUp } from 'lucide-react'
import { motion, Variants } from 'motion/react'
import { FC } from 'react'

const stats = [
	{
		icon: <BookOpen className='w-6 h-6' />,
		value: '12',
		label: 'Bộ flashcards',
		color: 'from-blue-500 to-cyan-500',
		shadow: 'shadow-blue-500/30',
	},
	{
		icon: <TrendingUp className='w-6 h-6' />,
		value: '85%',
		label: 'Độ chính xác',
		color: 'from-green-500 to-emerald-500',
		shadow: 'shadow-green-500/30',
	},
	{
		icon: <Timer className='w-6 h-6' />,
		value: '25h',
		label: 'Thời gian học',
		color: 'from-purple-500 to-pink-500',
		shadow: 'shadow-purple-500/30',
	},
	{
		icon: <StickyNote className='w-6 h-6' />,
		value: '8',
		label: 'Ghi chú',
		color: 'from-orange-500 to-red-500',
		shadow: 'shadow-orange-500/30',
	},
]

interface StatsProps {
	containerVariants: Variants
	itemVariants: Variants
}

const Stats: FC<StatsProps> = ({ itemVariants, containerVariants }) => {
	return (
		<motion.div
			variants={containerVariants}
			className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
			{stats.map((stat, index) => (
				<motion.div
					key={index}
					variants={itemVariants}
					whileHover={{ y: -5 }}>
					<Card
						className={clsx(
							'bg-linear-to-br text-white border-none',
							stat.color,
							stat.shadow,
							'shadow-lg',
						)}>
						<CardBody className='p-6'>
							<div className='flex items-center justify-between'>
								<div className='p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/10'>
									{stat.icon}
								</div>

								<div className='text-right'>
									<div className='text-3xl font-bold tracking-tight'>
										{stat.value}
									</div>

									<div className='text-sm font-medium opacity-90'>
										{stat.label}
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				</motion.div>
			))}
		</motion.div>
	)
}

export default Stats
