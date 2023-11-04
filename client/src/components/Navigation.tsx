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
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
export const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { isAuth, user, setUser, changeIsAuth } = useAuthStore()
	const { changeModalRegister, changeModalLogin } = useUIStore()
	const navigation = useNavigate()
	const path = window.location.pathname

	return (
		<Navbar
			shouldHideOnScroll
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
		>
			<NavbarContent
				className='sm:hidden'
				justify='start'
			>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				/>
			</NavbarContent>
			<NavbarContent
				className='sm:hidden pr-3'
				justify='center'
			>
				<NavbarBrand>
					<p className='font-bold text-inherit'>ACME</p>
				</NavbarBrand>
			</NavbarContent>
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
							<Avatar
								as={'button'}
								isBordered
								color='warning'
								name={user.name}
								className='cursor-pointer'
							/>
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
						<NavbarItem>
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
								className='hidden lg:flex'
								onClick={() => changeModalRegister(true)}
							>
								Registrarse
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>

			<NavbarMenu>
				<NavbarMenuItem>
					<Link
						className='w-full'
						size='lg'
						color='secondary'
					>
						direccion
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	)
}
