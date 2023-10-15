import { Footer, ModalLogin, ModalRegister, Navigation } from '@/components'
import { useModal } from '@/hooks'
import { Outlet, ScrollRestoration } from 'react-router-dom'

const BaseLayout = () => {
	const {
		onOpenLogin,
		onOpenRegister,
		isOpenLogin,
		isOpenRegister,
		onOpenChangeLogin,
		onOpenChangeRegister,
	} = useModal()
	return (
		<>
			<Navigation
				onOpenLogin={onOpenLogin}
				onOpenRegister={onOpenRegister}
			/>
			<Outlet />
			<Footer />
			<ModalRegister
				isOpen={isOpenRegister}
				onOpenChange={onOpenChangeRegister}
			/>
			<ModalLogin
				isOpen={isOpenLogin}
				onOpenChange={onOpenChangeLogin}
			/>
			<ScrollRestoration />
		</>
	)
}

export default BaseLayout
