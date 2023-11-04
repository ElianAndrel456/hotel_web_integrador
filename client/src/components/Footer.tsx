import { Image } from '@nextui-org/react'
import { useConstants } from '../constants'

export const Footer = () => {
	const { ADDRESS_INFORMATION, SOCIALS } = useConstants()
	return (
		<footer className='bg-black flex flex-col gap-10 text-white pt-12 pb-12 px-12 lg:px-[300px]'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4  '>
				<div className='flex flex-col gap-2'>
					<h6 className='text-sm font-bold'>DIRECCION:</h6>

					{ADDRESS_INFORMATION.map((address, index) => (
						<a
							data-aos='fade-right'
							data-aos-delay={index * 100}
							href={address.action}
							target='_blank'
							key={index}
						>
							{address.Icon}
							<span className='text-sm font-thin'>{address.text}</span>
						</a>
					))}
				</div>
				<div className='flex flex-col gap-2'>
					<h6 className='text-sm font-bold'>REDES SOCIALES:</h6>
					{SOCIALS.map((social, index) => (
						<a
							data-aos='fade-right'
							data-aos-delay={index * 100}
							href={social.url}
							target='_blank'
							key={index}
						>
							{social.Icon}
							<span className='text-sm font-thin'>Waynapicchu hotal</span>
						</a>
					))}
				</div>

				<div className=''>
					<a href='#'>
						<Image
							data-aos='fade-up'
							src='/logo.png'
							alt='logo waynapicchu hotel'
							className='w-[350px]'
						/>
					</a>
				</div>
			</div>
			<div className='flex justify-end gap-6'>
				<p className='text-sm font-thin'>Waynapicchu Hotel Cusco</p>
				<p className='text-sm font-thin'>
					2023 Copyright - Desarrollo Web Integrado
				</p>
			</div>
		</footer>
	)
}
