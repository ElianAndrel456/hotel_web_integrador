import { DashboardIcon } from '@/icons/DashboardIcon'
import { Avatar, Listbox, ListboxItem, Spacer } from '@nextui-org/react'
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ExitLogout } from '@/icons/ExitLogout'
import { ClientsIcon } from '@/icons/ClientsIcon'
import { BedIcon } from '@/icons/BedIcon'
import { ReservationIcon } from '@/icons/ReservationIcon'
import { ServicesAditionalIcon } from '@/icons/ServicesAditionalIcon'

export const AdminLayout = () => {
	const navigate = useNavigate()
	const isAuth = true

	useEffect(() => {
		if (!isAuth) {
			navigate('/')
		}
	}, [navigate, isAuth])

	return (
		<>
			{isAuth && (
				<div className='flex'>
					<nav className='min-w-[300px] flex flex-col min-h-screen border-r-3'>
						<header className='flex items-center flex-col justify-center py-16 bg-gray-800 relative'>
							<Avatar
								isBordered
								color='danger'
								name='Junior'
								size='lg'
							/>
							<Spacer y={4} />
							<h2 className=' text-gray-400 font-bold text-sm'>
								Bienvenido, Junior
							</h2>
							<Spacer y={2} />
							<span className='text-gray-300 font-thin text-xs'>
								Panel Administrador
							</span>
							<Spacer y={2} />
							<span className='text-gray-300 font-thin text-xs'>
								Hotel Waynapicchu
							</span>
						</header>
						<div className='pt-8'>
							<Listbox
								aria-label='Listbox Variants'
								className='gap-4'
							>
								<ListboxItem
									key='dashboard'
									startContent={<DashboardIcon />}
									onClick={() => navigate('/admin')}
								>
									Dashboard
								</ListboxItem>
								<ListboxItem
									startContent={<ClientsIcon />}
									key='clients'
									onClick={() => navigate('/admin/clientes')}
								>
									Clientes
								</ListboxItem>
								<ListboxItem
									startContent={<ReservationIcon />}
									key='reservations'
									onClick={() => navigate('/admin/reservaciones')}
								>
									Reservaciones
								</ListboxItem>
								<ListboxItem
									startContent={<BedIcon />}
									key='rooms'
									onClick={() => navigate('/admin/habitaciones')}
								>
									Habitaciones
								</ListboxItem>
								<ListboxItem
									startContent={<ServicesAditionalIcon />}
									key='services'
									showDivider
									onClick={() => navigate('/admin/servicios-adicionales')}
								>
									Servicion Adicionales
								</ListboxItem>
								<ListboxItem
									startContent={<ExitLogout />}
									key='exit'
									className='text-danger'
									color='danger'
									onClick={() => navigate('/')}
								>
									Cerrar sesion
								</ListboxItem>
							</Listbox>
						</div>
					</nav>

					<main className='w-full py-20 px-10'>
						<Outlet />
					</main>
				</div>
			)}
			<ScrollRestoration />
		</>
	)
}
