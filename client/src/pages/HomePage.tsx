import { Image, Spacer } from '@nextui-org/react'
import { CardRoom } from '@/components'
import { useScrollY } from '@/hooks'
import { ArrowDownCircleIcon } from '@/icons'

const HomePage = () => {
	const { scroll } = useScrollY()

	return (
		<>
			<main>
				<header className='text-white bg-hero-pattern bg-[rgba(0,0,0,0.5)] bg-blend-darken bg-no-repeat bg-cover bg-fixed min-h-screen w-full gap-4 flex relative justify-center items-center flex-col'>
					<h1 className='text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[white] to-[#F0A000]'>
						<span>Hotel </span>
						Waynapicchu
					</h1>
					<Spacer y={2} />
					<p className='text-xl font-semibold text-gray-400 max-w-lg text-center'>
						Welcome to the Hotel Waynapicchu, the best hotel in the world!
					</p>
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
						<CardRoom
							title='Plata'
							img_url='https://cf.bstatic.com/xdata/images/hotel/max1024x768/343137940.jpg?k=36b2680fc93291f7eeac1a4e3716b53700e8ca16b67b48345d9f3f775d72e779&o=&hp=1'
							ditails_url='#'
							reservation_url='#'
							description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Sagittis nisl rhoncus mattis rhoncus urna. In fermentum posuere urna nec tincidunt praesent semper. Consectetur adipiscing elit pellentesque habitant. Adipiscing diam donec adipiscing tristique risus.'
						/>
						<CardRoom
							title='Diamante'
							img_url='https://cf.bstatic.com/xdata/images/hotel/max1024x768/117560853.jpg?k=b6b488177bf18ad6f07223d116f1b30d3bf7c58378781f08a3393a9f889fc1d7&o=&hp=1'
							ditails_url='#'
							reservation_url='#'
							description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Sagittis nisl rhoncus mattis rhoncus urna. In fermentum posuere urna nec tincidunt praesent semper. Consectetur adipiscing elit pellentesque habitant. Adipiscing diam donec adipiscing tristique risus.'
							bg_color='bg-gradient-to-br from-orange-200 to-red-900 text-white'
						/>
						<CardRoom
							title='Oro'
							img_url='https://cf.bstatic.com/xdata/images/hotel/max1024x768/85796311.jpg?k=76f41f9cd013f4b37648b89ac9be1b721fd1228890633e964d317060fe338c1c&o=&hp=1'
							ditails_url='#'
							reservation_url='#'
							description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Sagittis nisl rhoncus mattis rhoncus urna. In fermentum posuere urna nec tincidunt praesent semper. Consectetur adipiscing elit pellentesque habitant. Adipiscing diam donec adipiscing tristique risus.'
						/>
					</div>
				</section>
			</main>
		</>
	)
}

export default HomePage
