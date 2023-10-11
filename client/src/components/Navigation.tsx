import {
	Button,
	Divider,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react'

export const Navigation = ({
	onOpenLogin,
	onOpenRegister,
}: {
	onOpenLogin: () => void
	onOpenRegister: () => void
}) => {
	return (
		<Navbar
			shouldHideOnScroll
			isBordered
		>
			<NavbarBrand>
				{/* <AcmeLogo /> */}
				<p className='font-bold text-inherit'>ACME</p>
			</NavbarBrand>
			<NavbarContent
				className='hidden sm:flex gap-4'
				justify='center'
			>
				<NavbarItem>
					<Link
						color='foreground'
						href='#'
					>
						Inicio
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link
						href='#'
						aria-current='page'
					>
						Sobre Nosotros
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						color='foreground'
						href='#'
					>
						Reservaciones
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						color='foreground'
						href='#'
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
