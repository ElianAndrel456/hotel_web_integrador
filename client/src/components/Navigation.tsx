import { initial_user, useAuthStore } from '@/store/auth.store'
import { useUIStore } from '@/store/ui.store'
import {
	Avatar,
	Button,
	Divider,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Image,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export const Navigation = () => {
	const { isAuth, user, setUser, changeIsAuth } = useAuthStore()
	const { changeModalRegister, changeModalLogin } = useUIStore()
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
				{isAuth && (
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
				)}
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
				{isAuth ? (
					<Dropdown>
						<DropdownTrigger>
							{/* 			<Tooltip content={user.name}> */}
							<Avatar
								as={'button'}
								isBordered
								color='warning'
								name={user.name}
								className='cursor-pointer'
							/>
							{/* 	</Tooltip> */}
						</DropdownTrigger>
						<DropdownMenu aria-label='Profile Actions'>
							<DropdownItem
								key='exit'
								className='text-danger'
								color='danger'
								onClick={() => {
									sessionStorage.removeItem('auth-storage')
									setUser(initial_user)
									changeIsAuth(false)
									navigation('/')
								}}
							>
								Salir
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<>
						<NavbarItem className='hidden lg:flex'>
							<Link onClick={() => changeModalLogin(true)}>Iniciar Sesion</Link>
						</NavbarItem>
						<Divider
							orientation='vertical'
							className='h-8'
						/>
						<NavbarItem>
							<Button
								color='primary'
								variant='flat'
								onClick={() => changeModalRegister(true)}
							>
								Registrarse
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navbar>
	)
}
