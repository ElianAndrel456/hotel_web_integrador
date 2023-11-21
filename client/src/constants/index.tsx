import { useMemo } from 'react'
import { EmailIcon, PhoneIcon, LocationIcon, InstagramIcon, GoogleIcon, FacebookIcon } from '@/icons'
import { i18n } from '@/i18n'
import { useUIStore } from '@/store/ui.store'

export const useConstants = () => {
  const { language } = useUIStore()

  const ROOMS_CATEGORY = useMemo(() => {
    return [
      { value: 'PLATA', label: 'Plata' },
      { value: 'ORO', label: 'Oro' },
      {
        value: 'DIAMANTE',
        label: 'Diamante',
      },
    ]
  }, [])

  const ROOM_TYPE = useMemo(() => {
    return [
      { value: 'INDIVIDUAL', label: 'Individual' },
      { value: 'DOBLE', label: 'Doble' },
      { value: 'SUITE', label: 'Suite' },
    ]
  }, [])

  const ROOM_STATE = useMemo(() => {
    return [
      { value: 'DISPONIBLE', label: 'Disponible' },
      { value: 'RESERVADO', label: 'Reservado' },
      {
        value: 'MANTENIMIENTO',
        label: 'Mantenimiento',
      },
    ]
  }, [])

  const RESERVATION_STATE = useMemo(() => {
    return [
      { value: 'PENDIENTE', label: 'Pendiente' },
      { value: 'PAGADO', label: 'Pagado' },
      { value: 'CANCELADO', label: 'Cancelado' },
      { value: 'FINALIZADO', label: 'Finalizado' },
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
    () =>
      i18n[language].home.CARDS_INFORMATION.map((card) => ({
        ...card,
        children: (
          <div
            className=' text-gray-400 text-sm font-thin py-6 space-y-4'
            style={card.bg_color ? { color: '#FFF' } : {}}
          >
            <p>{card.description}</p>
            <ul className='space-y-2'>
              {card.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ),
      })),

    [language]
  )

  return {
    ADDRESS_INFORMATION,
    SOCIALS,
    CARDS_INFORMATION,
    ROOMS_CATEGORY,
    ROOM_STATE,
    RESERVATION_STATE,
    ROOM_TYPE,
  }
}
