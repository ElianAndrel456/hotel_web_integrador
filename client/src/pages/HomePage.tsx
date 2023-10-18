import { Button, Image, Spacer } from '@nextui-org/react'
import { CardRoom } from '@/components'
import { useScrollY } from '@/hooks'
import { ArrowDownCircleIcon } from '@/icons'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/auth.store'
import { useUIStore } from '@/store/ui.store'

const HomePage = () => {
	const { isAuth } = useAuthStore()
	const { changeModalLogin } = useUIStore()
	const { scroll } = useScrollY()

	return (
		<>
			<main>
				<header className='text-white bg-hero-pattern bg-[rgba(0,0,0,0.5)] bg-blend-darken bg-no-repeat bg-cover bg-fixed min-h-screen w-full gap-4 flex relative justify-center items-center flex-col'>
					<motion.h1
						animate={{ x: 0, opacity: 1 }}
						initial={{ x: -100, opacity: 0 }}
						className='text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[white] to-[#F0A000]'
					>
						<span>Hotel </span>
						Waynapicchu
					</motion.h1>
					<Spacer y={2} />
					<motion.p
						animate={{ x: 0, opacity: 1 }}
						initial={{ x: -100, opacity: 0 }}
						transition={{ delay: 0.2 }}
						className=' font-semibold text-gray-400 max-w-lg text-center'
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
								className='text-white tracking-widest uppercase underline-offset-4 underline text-2xl'
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
				<section className='py-16 px-[300px]'>
					<div className='w-full grid gap-8 grid-cols-2 items-center'>
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
					className='py-16 px-[300px]'
				>
					<h3 className='text-5xl text-[#F0A000] font-bold text-center'>
						Relájate en nuestra Suite
					</h3>
					<Spacer y={20} />
					<div className='flex w-full justify-around'>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ delay: 0.1 }}
						>
							<CardRoom
								title='Plata'
								img_url='https://cf.bstatic.com/xdata/images/hotel/max1024x768/343137940.jpg?k=36b2680fc93291f7eeac1a4e3716b53700e8ca16b67b48345d9f3f775d72e779&o=&hp=1'
								ditails_url='#'
								reservation_url='#'
								children={
									<div className=' text-gray-400 text-sm font-thin py-6 space-y-4'>
										<p>
											Esta categoría de habitación ofrece una estancia cómoda y
											conveniente para los huéspedes que desean disfrutar de una
											habitación con camas adicionales y comodidades modernas,
											como televisión por cable y teléfono fijo, mientras tienen
											la privacidad de un baño propio.
										</p>
										<ul className='space-y-2'>
											<li>2 Camas de Plaza y media</li>
											<li>baño privado</li>
											<li>Television con cable</li>
											<li>Telefono fijo</li>
										</ul>
									</div>
								}
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ delay: 0.15 }}
						>
							<CardRoom
								title='Diamante'
								img_url='https://cf.bstatic.com/xdata/images/hotel/max1024x768/117560853.jpg?k=b6b488177bf18ad6f07223d116f1b30d3bf7c58378781f08a3393a9f889fc1d7&o=&hp=1'
								ditails_url='#'
								reservation_url='#'
								bg_color='bg-gradient-to-br from-orange-200 to-red-900 text-white'
								children={
									<div className=' text-white text-sm font-thin py-6 space-y-4'>
										<p>
											La categoría Diamante está diseñada para ofrecer una
											experiencia de alojamiento de alto nivel con comodidades
											exclusivas como el jacuzzi, una sala de estar privada y la
											comodidad adicional de tener un bar en las instalaciones
											del hotel. Estas características crean un ambiente lujoso
											y cómodo para los visitantes que buscan una estancia
											verdaderamente indulgente.
										</p>
										<ul className='space-y-2'>
											<li>1 Cama QUEEN</li>
											<li>baño privado con Jacuzzi</li>
											<li>Television con cable</li>
											<li>Telefono fijo</li>
											<li>Sala estar</li>
											<li>Bar del hotal</li>
										</ul>
									</div>
								}
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
						>
							<CardRoom
								title='Oro'
								img_url='https://cf.bstatic.com/xdata/images/hotel/max1024x768/85796311.jpg?k=76f41f9cd013f4b37648b89ac9be1b721fd1228890633e964d317060fe338c1c&o=&hp=1'
								ditails_url='#'
								reservation_url='#'
								children={
									<div className=' text-gray-400 text-sm font-thin py-6 space-y-4'>
										<p>
											La categoría Oro está diseñada para ofrecer a los
											huéspedes una experiencia de alojamiento de alta calidad,
											con comodidades adicionales como el jacuzzi y una sala de
											estar, además de las comodidades estándar como la
											televisión por cable y el teléfono fijo. Esto crea un
											ambiente lujoso y cómodo para los visitantes del hotel.
										</p>
										<ul className='space-y-2'>
											<li>1 Cama QUEEN</li>
											<li>baño privado con Jacuzzi</li>
											<li>Television con cable</li>
											<li>Telefono fijo</li>
											<li>Sala estar</li>
										</ul>
									</div>
								}
							/>
						</motion.div>
					</div>
				</section>
			</main>
		</>
	)
}

export default HomePage
