import { Button, Image, Spacer } from '@nextui-org/react'
import { CardRoom } from '@/components'
import { useScrollY } from '@/hooks'
import { ArrowDownCircleIcon } from '@/icons'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/auth.store'
import { useUIStore } from '@/store/ui.store'
import { useConstants } from '@/constants'

const HomePage = () => {
	const { isAuth } = useAuthStore()
	const { changeModalLogin } = useUIStore()
	const { scroll } = useScrollY()
	const { CARDS_INFORMATION } = useConstants()

	return (
		<>
			<main>
				<header className='text-white bg-hero-pattern bg-[rgba(0,0,0,0.5)] bg-blend-darken bg-no-repeat bg-cover bg-fixed min-h-screen w-full gap-4 flex relative justify-center items-center flex-col'>
					<motion.h1
						animate={{ x: 0, opacity: 1 }}
						initial={{ x: -100, opacity: 0 }}
						className='text-4xl text-center lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[white] to-[#F0A000]'
					>
						<span>Hotel </span>
						Waynapicchu
					</motion.h1>
					<Spacer y={2} />
					<motion.p
						animate={{ x: 0, opacity: 1 }}
						initial={{ x: -100, opacity: 0 }}
						transition={{ delay: 0.2 }}
						className=' text-sm lg:text-medium font-semibold text-gray-400 max-w-lg text-center'
					>
						Un hotel acogedor perfectamente diseñado para convertir tus gratos
						momentos en una experiencia mágica e inolvidable.
					</motion.p>
					{!isAuth && (
						<motion.p
							animate={{ x: 0, opacity: 1 }}
							initial={{ x: -100, opacity: 0 }}
							transition={{ delay: 0.2 }}
							className='font-semibold mt-10 text-white max-w-lg text-center'
						>
							<Button
								variant='bordered'
								className=' text-white tracking-widest uppercase underline-offset-4 underline text-sm lg:text-2xl'
								onClick={() => {
									if (!isAuth) changeModalLogin(true)
								}}
							>
								Reserva tu Habitacion ahora
							</Button>
						</motion.p>
					)}
					<a
						href='#reservation'
						className='absolute bottom-20'
					>
						{scroll > 200 ? (
							''
						) : (
							<ArrowDownCircleIcon className='text-4xl animate-bounce' />
						)}
					</a>
				</header>
				<section className='py-16 px-12 lg:px-[300px]'>
					<div className='w-full grid gap-8 grid-cols-1 lg:grid-cols-2 items-center'>
						<div
							data-aos='fade-right'
							className='text-center space-y-8'
						>
							<h3 className='text-5xl text-[#F0A000] font-bold '>
								Relájate en nuestra Suite
							</h3>
							<p className=''>
								Nuestra Suite es probablemente el ambiente que más refleja la
								personalidad del habitante y el más laborioso de planear. El
								espacio requiere confort, hospitalidad y estilo para recibir los
								momentos más íntimos del usuario. Es allí donde están nuestros
								recuerdos más profundos, nuestras piezas favoritas
							</p>
						</div>
						<div data-aos='zoom-in'>
							<Image
								isZoomed
								isBlurred
								src='https://waynapicchuhotel.com.pe/wp-content/uploads/2021/01/Mesa-de-trabajo-1307-1.png'
								alt='secondary_image'
							/>
						</div>
					</div>
				</section>
				<section
					id='reservation'
					className='py-16 px-12 lg:px-[300px]'
				>
					<h3 className='text-5xl text-[#F0A000] font-bold text-center'>
						Relájate en nuestra Suite
					</h3>
					<Spacer y={20} />
					<div className='flex w-full gap-8 justify-around flex-wrap'>
						{CARDS_INFORMATION.map((card, index) => (
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 0.1 * index }}
							>
								<CardRoom
									key={index}
									title={card.title}
									img_url={card.img_url}
									ditails_url={card.ditails_url}
									reservation_url={card.reservation_url}
									bg_color={card.bg_color ?? ''}
									children={card.children}
								/>
							</motion.div>
						))}
					</div>
				</section>
			</main>
		</>
	)
}

export default HomePage
