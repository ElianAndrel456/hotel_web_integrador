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

export const AdminLayout = () => {
	const navigate = useNavigate()
	const { isAuth, setUser, changeIsAuth, user } = useAuthStore()
	const { setClients } = useClientStore()
	const { setRoomsStore } = useRoomStore()
	const { setServicesStore } = useServiceStore()
	const [openMenu, setOpenMenu] = useState(false)

	useEffect(() => {
		if (!isAuth) {
			navigate('/')
		}
	}, [navigate, isAuth])

	useEffect(() => {
		const fetchClients = async () => {
			const data = await getAllClientes()

			const contractData = data.map(
				(d: {
					number_of_document: string
					name: string
					lastname: string
					type_of_document: string
					phone: string
					email: string
					id: number
				}) => ({
					number_of_document: d.number_of_document,
					name: d.name + ' ' + d.lastname,
					type_of_document: d.type_of_document,
					phone: d.phone,
					email: d.email,
					id: d.id,
				})
			)
			setClients(contractData)
		}
		fetchClients()
	}, [setClients])

	useEffect(() => {
		async function fetch_rooms() {
			const data = await getAllRooms()

			const contractData = data.map(
				(room: {
					id: number
					state: string
					categoryRoom: string
					floor: string
				}) => ({
					id: room.id,
					status: room.state,
					category: room.categoryRoom,
					floor: room.floor,
				})
			)

			setRoomsStore(contractData)
		}
		fetch_rooms()
	}, [setRoomsStore])

	useEffect(() => {
		async function fetch_services() {
			const data = await getAllServices()

			const contractData = data.map(
				(service: {
					id: number
					name: string
					price: number
					description: string
				}) => ({
					id: service.id,
					name: service.name,
					price: service.price,
					description: service.description,
				})
			)
			setServicesStore(contractData)
		}
		fetch_services()
	}, [setServicesStore])

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
