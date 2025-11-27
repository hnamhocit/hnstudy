import { Button, Card, CardBody } from '@heroui/react'
import { motion, Variants } from 'motion/react'
import { FC } from 'react'

interface CommunityProps {
	itemVariants: Variants
}

const Community: FC<CommunityProps> = ({ itemVariants }) => {
	return (
		<motion.div variants={itemVariants}>
			<Card className='bg-linear-to-br from-blue-600 to-purple-700 text-white shadow-lg shadow-purple-500/20 border-none overflow-hidden relative'>
				<div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10'></div>
				<div className='absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10'></div>

				<CardBody className='p-6 text-center relative z-10'>
					<h3 className='font-bold text-lg mb-1'>
						Cộng đồng hnstudy
					</h3>

					<p className='text-blue-100 text-sm mb-6'>
						Cùng nhau tiến bộ mỗi ngày
					</p>

					<div className='grid grid-cols-3 gap-2 text-sm'>
						<div className='p-2 rounded-lg bg-white/10 backdrop-blur-sm'>
							<div className='text-lg font-bold'>1.2K</div>

							<div className='text-[10px] opacity-80 uppercase tracking-wider'>
								Members
							</div>
						</div>

						<div className='p-2 rounded-lg bg-white/10 backdrop-blur-sm'>
							<div className='text-lg font-bold'>500+</div>

							<div className='text-[10px] opacity-80 uppercase tracking-wider'>
								Posts
							</div>
						</div>

						<div className='p-2 rounded-lg bg-white/10 backdrop-blur-sm'>
							<div className='text-lg font-bold'>98%</div>

							<div className='text-[10px] opacity-80 uppercase tracking-wider'>
								Happy
							</div>
						</div>
					</div>

					<Button
						className='w-full mt-6 bg-white text-blue-600 font-bold shadow-md'
						size='sm'>
						Tham gia ngay
					</Button>
				</CardBody>
			</Card>
		</motion.div>
	)
}

export default Community
