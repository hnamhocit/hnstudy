import { Card, CardBody } from '@heroui/react'
import clsx from 'clsx'
import { Heart, MessageCircle } from 'lucide-react'
import { motion, Variants } from 'motion/react'
import { FC } from 'react'

const recentPosts = [
	{
		id: 1,
		title: 'Cách học từ vựng hiệu quả với Spaced Repetition',
		content:
			'Khám phá phương pháp ghi nhớ từ vựng lâu dài với kỹ thuật lặp lại ngắt quãng...',
		author: 'Admin',
		role: 'Moderator',
		likes: 24,
		comments: 8,
		initials: 'AD',
		color: 'bg-blue-100 text-blue-600',
	},
	{
		id: 2,
		title: 'Pomodoro Technique - Tối ưu hóa thời gian học tập',
		content:
			'Hướng dẫn chi tiết cách sử dụng kỹ thuật Pomodoro để học tập hiệu quả hơn...',
		author: 'Study Expert',
		role: 'Teacher',
		likes: 18,
		comments: 5,
		initials: 'SE',
		color: 'bg-purple-100 text-purple-600',
	},
	{
		id: 3,
		title: 'Tạo flashcards thông minh cho môn Lập trình',
		content:
			'Mẹo và chiến lược tạo flashcards hiệu quả cho các khái niệm lập trình...',
		author: 'Tech Mentor',
		role: 'Mentor',
		likes: 32,
		comments: 12,
		initials: 'TM',
		color: 'bg-orange-100 text-orange-600',
	},
]

interface RecentPostsProps {
	itemVariants: Variants
}

const RecentPosts: FC<RecentPostsProps> = ({ itemVariants }) => {
	return (
		<div className='space-y-4'>
			{recentPosts.map((post) => (
				<motion.div
					key={post.id}
					variants={itemVariants}>
					<Card className='hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 border border-transparent transition-all duration-300 bg-white dark:bg-slate-800'>
						<CardBody className='p-5'>
							<div className='flex items-center gap-3 mb-3'>
								<div
									className={clsx(
										'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
										post.color,
									)}>
									{post.initials}
								</div>

								<div>
									<div className='text-xs font-semibold text-gray-900 dark:text-white'>
										{post.author}
									</div>

									<div className='text-[10px] text-gray-500 uppercase tracking-wider'>
										{post.role}
									</div>
								</div>
							</div>

							<h3 className='font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer'>
								{post.title}
							</h3>

							<p className='text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-4 leading-relaxed'>
								{post.content}
							</p>

							<div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-slate-700'>
								<div className='flex items-center gap-4'>
									<span className='flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer group'>
										<Heart className='w-3.5 h-3.5 group-hover:fill-red-500' />
										{post.likes}
									</span>

									<span className='flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer group'>
										<MessageCircle className='w-3.5 h-3.5 group-hover:fill-blue-500' />
										{post.comments}
									</span>
								</div>

								<span className='text-xs'>2 giờ trước</span>
							</div>
						</CardBody>
					</Card>
				</motion.div>
			))}
		</div>
	)
}

export default RecentPosts
