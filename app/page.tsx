'use client'

import { Button } from '@heroui/react'
import { Plus } from 'lucide-react'
import { motion, Variants } from 'motion/react'

import Community from '@/components/home/Community'
import RecentPosts from '@/components/home/RecentPosts'
import Stats from '@/components/home/Stats'
import Tools from '@/components/home/Tools'
import DefaultLayout from '@/layouts/DefaultLayout'

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: 'easeOut' },
	},
}

export default function Dashboard() {
	return (
		<DefaultLayout>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				className='space-y-8'>
				<motion.div
					variants={itemVariants}
					className='text-center lg:text-left'>
					<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight'>
						Chào mừng trở lại! 👋
					</h1>

					<p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed'>
						Sẵn sàng cho một ngày học tập hiệu quả? Hãy bắt đầu với
						các công cụ bên dưới.
					</p>
				</motion.div>

				<Stats
					containerVariants={containerVariants}
					itemVariants={itemVariants}
				/>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<Tools
						itemVariants={itemVariants}
						containerVariants={containerVariants}
					/>

					<motion.div
						variants={containerVariants}
						className='space-y-6'>
						<motion.div
							variants={itemVariants}
							className='flex items-center justify-between'>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
								Bài viết nổi bật
							</h2>

							<Button
								isIconOnly
								variant='flat'
								size='sm'
								className='bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300'>
								<Plus className='w-4 h-4' />
							</Button>
						</motion.div>

						<RecentPosts itemVariants={itemVariants} />

						<Community itemVariants={itemVariants} />
					</motion.div>
				</div>
			</motion.div>
		</DefaultLayout>
	)
}
