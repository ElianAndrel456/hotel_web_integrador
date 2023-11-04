import { useMemo } from 'react'
import {
	EmailIcon,
	PhoneIcon,
	LocationIcon,
	InstagramIcon,
	GoogleIcon,
	FacebookIcon,
} from '@/icons'

export const useConstants = () => {
	const TYPE_OF_DOCUMENTS = useMemo(() => {
		return [
			{ value: '0', label: 'DNI' },
			{ value: '1', label: 'Pasaporte' },
			{
				value: '2',
				label: 'Carnet de extranjería',
			},
		]
	}, [])
	const ROOMS_CATEGORY = useMemo(() => {
		return [
			{ value: '0', label: 'Plata' },
			{ value: '1', label: 'Oro' },
			{
				value: '2',
				label: 'Diamante',
			},
		]
	}, [])

	const ROOM_STATE = useMemo(() => {
		return [
			{ value: '0', label: 'Disponible' },
			{ value: '1', label: 'Ocupado' },
			{
				value: '2',
				label: 'Mantenimiento',
			},
		]
	}, [])

	const ADDRESS_INFORMATION = useMemo(
		() => [
			{
				Icon: <LocationIcon className='inline-block mr-2 text-[#F0A000]' />,
				text: 'Av. Garcilaso 216-A - Wanchaq / Cusco',
				action:
					'https://www.google.com/maps/place/Hotel+Waynapicchu/@-13.5224959,-71.9727541,20z/data=!4m9!3m8!1s0x916dd60a7f10cc9f:0x5c6d50732218ad5!5m2!4m1!1i2!8m2!3d-13.5224086!4d-71.9724811!16s%2Fg%2F11z1jsbh2?entry=ttu',
			},
			{
				Icon: <PhoneIcon className='inline-block mr-2 text-[#F0A000]' />,
				text: '+51 944268176',
				action: 'tel:+51944268176',
			},
			{
				Icon: <EmailIcon className='inline-block mr-2 text-[#F0A000]' />,
				text: 'reservas@waynapicchu.com.pe',
				action: 'mailto:reservas@waynapicchu.com.pe',
			},
		],
		[]
	)
	const SOCIALS = useMemo(
		() => [
			{
				Icon: <FacebookIcon className='inline-block mr-2' />,
				url: 'https://www.facebook.com/WaynapicchuHotel',
			},
			{
				Icon: <InstagramIcon className='inline-block mr-2' />,
				url: 'https://www.instagram.com/waynapicchuhostel',
			},
			{
				Icon: <GoogleIcon className='inline-block mr-2' />,
				url: 'https://www.tripadvisor.com.pe/Hotel_Review-g294314-d1237015-Reviews-Waynapicchu_Hostel-Cusco_Cusco_Region.html',
			},
		],
		[]
	)

	const CARDS_INFORMATION = useMemo(
		() => [
			{
				title: 'Plata',
				img_url:
					'https://cf.bstatic.com/xdata/images/hotel/max1024x768/343137940.jpg?k=36b2680fc93291f7eeac1a4e3716b53700e8ca16b67b48345d9f3f775d72e779&o=&hp=1',
				ditails_url: '#',
				reservation_url: '#',
				children: (
					<div className=' text-gray-400 text-sm font-thin py-6 space-y-4'>
						<p>
							Esta categoría de habitación ofrece una estancia cómoda y
							conveniente para los huéspedes que desean disfrutar de una
							habitación con camas adicionales y comodidades modernas, como
							televisión por cable y teléfono fijo, mientras tienen la
							privacidad de un baño propio.
						</p>
						<ul className='space-y-2'>
							<li>2 Camas de Plaza y media</li>
							<li>baño privado</li>
							<li>Television con cable</li>
							<li>Telefono fijo</li>
						</ul>
					</div>
				),
			},
			{
				title: 'Diamante',
				img_url:
					'https://cf.bstatic.com/xdata/images/hotel/max1024x768/117560853.jpg?k=b6b488177bf18ad6f07223d116f1b30d3bf7c58378781f08a3393a9f889fc1d7&o=&hp=1',
				ditails_url: '#',
				reservation_url: '#',
				bg_color: 'bg-gradient-to-br from-orange-200 to-red-900 text-white',
				children: (
					<div className=' text-white text-sm font-thin py-6 space-y-4'>
						<p>
							La categoría Diamante está diseñada para ofrecer una experiencia
							de alojamiento de alto nivel con comodidades exclusivas como el
							jacuzzi, una sala de estar privada y la comodidad adicional de
							tener un bar en las instalaciones del hotel. Estas características
							crean un ambiente lujoso y cómodo para los visitantes que buscan
							una estancia verdaderamente indulgente.
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
				),
			},
			{
				title: 'Oro',
				img_url:
					'https://cf.bstatic.com/xdata/images/hotel/max1024x768/85796311.jpg?k=76f41f9cd013f4b37648b89ac9be1b721fd1228890633e964d317060fe338c1c&o=&hp=1',
				ditails_url: '#',
				reservation_url: '#',
				children: (
					<div className=' text-gray-400 text-sm font-thin py-6 space-y-4'>
						<p>
							La categoría Oro está diseñada para ofrecer a los huéspedes una
							experiencia de alojamiento de alta calidad, con comodidades
							adicionales como el jacuzzi y una sala de estar, además de las
							comodidades estándar como la televisión por cable y el teléfono
							fijo. Esto crea un ambiente lujoso y cómodo para los visitantes
							del hotel.
						</p>
						<ul className='space-y-2'>
							<li>1 Cama QUEEN</li>
							<li>baño privado con Jacuzzi</li>
							<li>Television con cable</li>
							<li>Telefono fijo</li>
							<li>Sala estar</li>
						</ul>
					</div>
				),
			},
		],
		[]
	)

	return {
		ADDRESS_INFORMATION,
		SOCIALS,
		TYPE_OF_DOCUMENTS,
		CARDS_INFORMATION,
		ROOMS_CATEGORY,
		ROOM_STATE,
	}
}
