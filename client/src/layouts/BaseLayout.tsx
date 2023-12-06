import { Footer, ModalLogin, ModalRegister, Navigation } from '@/components'
import { useAuthStore } from '@/store/auth.store'
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ModalCode } from '@/components/ModalCode'
import { ToastContainer } from 'react-toastify'
import { Avatar, Select, SelectItem } from '@nextui-org/react'
import { useUIStore } from '@/store/ui.store'

const BaseLayout = () => {
  const navigate = useNavigate()
  const { isAuth, user } = useAuthStore()
  const { changeLanguage } = useUIStore()

  useEffect(() => {
    if (isAuth && user.rol === 'ADMINISTRADOR') {
      navigate('/admin')
    }
  }, [navigate, isAuth, user])

  return (
    <>
      {user.rol === 'ADMIN' ? (
        ''
      ) : (
        <>
          <ToastContainer
            closeButton
            position='bottom-right'
            autoClose={1500}
          />
          <div className='fixed bottom-4 right-4 w-20 z-20'>
            <Select
              defaultSelectedKeys={['es']}
              onChange={(e) => {
                if (e.target.value) changeLanguage(e.target.value as 'es' | 'en')
              }}
              size='sm'
            >
              <SelectItem
                key='es'
                value='es'
                startContent={
                  <Avatar
                    alt='Spain'
                    className='w-5 h-5'
                    src='https://flagcdn.com/es.svg'
                  />
                }
              >
                ES
              </SelectItem>
              <SelectItem
                key='en'
                value='en'
                startContent={
                  <Avatar
                    alt='EEUU'
                    className='w-5 h-5'
                    src='https://flagcdn.com/us.svg'
                  />
                }
              >
                EN
              </SelectItem>
            </Select>
          </div>
          <Navigation />
          <Outlet />
          <Footer />
          <ModalRegister />
          <ModalLogin />
          <ModalCode />
          <ScrollRestoration />
        </>
      )}
    </>
  )
}

export default BaseLayout
