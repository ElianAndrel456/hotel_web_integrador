import {
	Button,
	Divider,
	Image,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export const Navigation = ({
	onOpenLogin,
	onOpenRegister,
}: {
	onOpenLogin: () => void
	onOpenRegister: () => void
}) => {
	const navigation = useNavigate()
	const path = window.location.pathname

	return (
		<Navbar shouldHideOnScroll>
			<NavbarBrand>
				<Image
					src='/icon_hotel.png'
					alt='logo waynapicchu hotel'
					className='sepia brightness-0  h-10'
				/>
				<p className='font-bold text-inherit'>HOTEL</p>
			</NavbarBrand>
			<NavbarContent
				className='hidden sm:flex gap-4'
				justify='center'
			>
				<NavbarItem isActive={path === '/'}>
					<Link
						onClick={() => {
							navigation('/')
						}}
						color={`${path === '/' ? 'primary' : 'foreground'}`}
					>
						Inicio
					</Link>
				</NavbarItem>
				<NavbarItem isActive={path === '/sobre-nosotros'}>
					<Link
						onClick={() => {
							navigation('/sobre-nosotros')
						}}
						color={`${path === '/sobre-nosotros' ? 'primary' : 'foreground'}`}
					>
						Sobre Nosotros
					</Link>
				</NavbarItem>
				<NavbarItem isActive={path === '/reservacion'}>
					<Link
						onClick={() => {
							navigation('/reservacion')
						}}
						color={`${path === '/reservacion' ? 'primary' : 'foreground'}`}
					>
						Reservaciones
					</Link>
				</NavbarItem>
				<NavbarItem isActive={path === '/contacto'}>
					<Link
						onClick={() => {
							navigation('/contacto')
						}}
						color={`${path === '/contacto' ? 'primary' : 'foreground'}`}
					>
						Contáctanos
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem className='hidden lg:flex'>
					<Link onClick={onOpenLogin}>Iniciar Sesion</Link>
				</NavbarItem>
				<Divider
					orientation='vertical'
					className='h-8'
				/>
				<NavbarItem>
					<Button
						color='primary'
						variant='flat'
						onClick={onOpenRegister}
					>
						Registrarse
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	)
}
