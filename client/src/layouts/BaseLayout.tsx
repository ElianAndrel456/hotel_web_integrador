import { Footer, ModalLogin, ModalRegister, Navigation } from '@/components'
import { useAuthStore } from '@/store/auth.store'
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ModalCode } from '@/components/ModalCode'
import { ToastContainer } from 'react-toastify'

const BaseLayout = () => {
  const navigate = useNavigate()
  const { isAuth, user } = useAuthStore()

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
