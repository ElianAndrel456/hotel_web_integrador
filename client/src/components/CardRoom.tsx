import { Card, Button, CardBody, CardFooter, CardHeader, Image, Spacer } from '@nextui-org/react'
import { ICardRoomProps } from './component'
import { useUIStore } from '@/store/ui.store'
import { useAuthStore } from '@/store/auth.store'
import { useNavigate } from 'react-router-dom'
import { i18n } from '@/i18n'

export const CardRoom = ({ title, openModalDitails, img_url, reservation_url, children }: ICardRoomProps) => {
  const { isAuth, user } = useAuthStore()
  const { changeModalLogin } = useUIStore()
  const { language } = useUIStore()
  const navigate = useNavigate()

  return (
    <Card
      className={`h-full max-w-[340px] hover:scale-105 ${
        title === i18n[language].home.CARDS_INFORMATION[1].title
          ? 'bg-gradient-to-br from-orange-200 to-red-900 text-white'
          : ''
      }`}
    >
      <CardHeader>
        <h4 className='text-center text-2xl block font-semibold'>{title}</h4>
      </CardHeader>
      <CardBody>
        {img_url && (
          <Image
            src={img_url}
            alt={title + '_image'}
            className='w-full h-[200px] object-cover object-center'
          />
        )}
        <Spacer y={2} />
        {children}
      </CardBody>
      <CardFooter className='flex justify-end gap-4'>
        {reservation_url && (
          <Button
            color='primary'
            variant='flat'
            onClick={() => {
              if (!isAuth) changeModalLogin(true)
              else if (isAuth && user) navigate('/reservation')
            }}
            className=''
          >
            Reservar
          </Button>
        )}
        {openModalDitails && (
          <Button
            color='secondary'
            variant='bordered'
            onClick={openModalDitails}
            className='hidden'
          >
            Ver detalle
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
