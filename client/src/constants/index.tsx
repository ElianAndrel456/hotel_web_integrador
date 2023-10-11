import { useMemo } from 'react'
import FacebookIcon from '../icons/FacebookIcon'
import GoogleIcon from '../icons/GoogleIcon'
import InstagramIcon from '../icons/InstagramIcon'
import LocationIcon from '../icons/LocationIcon'
import PhoneIcon from '../icons/PhoneIcon'
import EmailIcon from '../icons/EmailIcon'

export const useConstants = () => {
	const ADDRESS_INFORMATION = useMemo(
		() => [
			{
				Icon: <LocationIcon className='inline-block mr-2 text-lime-400' />,
				text: 'Av. Garcilaso 216-A - Wanchaq / Cusco',
				action:
					'https://www.google.com/maps/place/Hotel+Waynapicchu/@-13.5224959,-71.9727541,20z/data=!4m9!3m8!1s0x916dd60a7f10cc9f:0x5c6d50732218ad5!5m2!4m1!1i2!8m2!3d-13.5224086!4d-71.9724811!16s%2Fg%2F11z1jsbh2?entry=ttu',
			},
			{
				Icon: <PhoneIcon className='inline-block mr-2 text-lime-400' />,
				text: '+51 944268176',
				action: 'tel:+51944268176',
			},
			{
				Icon: <EmailIcon className='inline-block mr-2 text-lime-400' />,
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

	return { ADDRESS_INFORMATION, SOCIALS }
}
