import { Footer, ModalLogin, ModalRegister, Navigation } from '@/components'
import { useAuthStore } from '@/store/auth.store'
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const BaseLayout = () => {
	const navigate = useNavigate()
	const { isAuth, user } = useAuthStore()

	useEffect(() => {
		if (isAuth && user.rol === 'ADMIN') {
			navigate('/admin')
		}
	}, [navigate, isAuth, user])

	return (
		<>
			{user.rol === 'ADMIN' ? (
				''
			) : (
				<>
					<Navigation />
					<Outlet />
					<Footer />
					<ModalRegister />
					<ModalLogin />
					<ScrollRestoration />
				</>
			)}
		</>
	)
}

export default BaseLayout
