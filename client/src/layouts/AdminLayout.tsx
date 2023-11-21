import { DashboardIcon } from '@/icons/DashboardIcon'
import { Avatar, Listbox, ListboxItem, Spacer } from '@nextui-org/react'
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ExitLogout } from '@/icons/ExitLogout'
import { ClientsIcon } from '@/icons/ClientsIcon'
import { BedIcon } from '@/icons/BedIcon'
import { ReservationIcon } from '@/icons/ReservationIcon'
import { ServicesAditionalIcon } from '@/icons/ServicesAditionalIcon'
import { initial_user, useAuthStore } from '@/store/auth.store'
import { getAllClientes } from '@/services/clients.service'
import { useClientStore } from '@/store/client.store'
import { getAllRooms } from '@/services/rooms.services'
import { useRoomStore } from '@/store/room.store'
import { getAllServices } from '@/services/aditional_services.service'
import { useServiceStore } from '@/store/aditionalService.store'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { IoExit } from 'react-icons/io5'
import { useReservationStore } from '@/store/reservation.store'
import { getAllReservations } from '@/services/reserved_room.service'

export const AdminLayout = () => {
	const navigate = useNavigate()
	const { isAuth, setUser, changeIsAuth, user } = useAuthStore()
	const { setClients } = useClientStore()
	const { setRoomsStore } = useRoomStore()
	const { setServicesStore } = useServiceStore()
	const { setReservationStore } = useReservationStore()
	const [openMenu, setOpenMenu] = useState(false)

	useEffect(() => {
		if (!isAuth) {
			navigate('/')
		}
	}, [navigate, isAuth])

	useEffect(() => {
		const fetchData = async () => {
			const reservations = await getAllReservations()
			const clients = await getAllClientes()
			const rooms = await getAllRooms()
			const services = await getAllServices()
			setServicesStore(services)
			setRoomsStore(rooms)
			setClients(clients)
			setReservationStore(reservations)
		}
		fetchData()
	}, [setClients, setReservationStore, setRoomsStore, setServicesStore])

	return (
		<>
			<ToastContainer
				closeButton
				position='bottom-right'
				autoClose={1500}
			/>
			{isAuth && (
				<div className='flex'>
					<nav
						className={`min-w-[300px] lg:flex flex-col min-h-screen border-r-3 fixed  ${
							openMenu ? 'translate-x-0' : '-translate-x-[300px]'
						} z-10 bg-white lg:translate-x-0 lg:relative transition-all duration-300 ease-in-out`}
					>
						<header className='flex items-center flex-col justify-center py-16 bg-gray-800 relative'>
							<Avatar
								isBordered
								color='danger'
								name={user.name}
								size='lg'
							/>
							<Spacer y={4} />
							<h2 className=' text-gray-400 font-bold text-sm'>
								Bienvenido, {user.name}
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
									onClick={() => {
										sessionStorage.removeItem('auth-storage')
										setUser(initial_user)
										changeIsAuth(false)
										navigate('/')
									}}
								>
									Cerrar sesion
								</ListboxItem>
							</Listbox>
						</div>
					</nav>

					<main className='w-full py-20 px-10'>
						{window.innerWidth < 1024 && (
							<IoExit
								className='fixed top-6 text-3xl '
								onClick={() => {
									setOpenMenu(!openMenu)
								}}
							/>
						)}
						<Outlet />
					</main>
				</div>
			)}
			<ScrollRestoration />
		</>
	)
}
