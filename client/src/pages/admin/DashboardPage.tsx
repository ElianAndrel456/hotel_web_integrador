import { ChartComponent } from '@/components/ChartArea'
import { ClientsIcon } from '@/icons/ClientsIcon'
import { ReservationIcon } from '@/icons/ReservationIcon'
import { ServicesAditionalIcon } from '@/icons/ServicesAditionalIcon'
import { useServiceStore } from '@/store/aditionalService.store'
import { useClientStore } from '@/store/client.store'
import { useRoomStore } from '@/store/room.store'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Spacer,
} from '@nextui-org/react'
import { BedIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const initialData = [
	{ time: '2018-12-22', value: 32.51 },
	{ time: '2018-12-23', value: 31.11 },
	{ time: '2018-12-24', value: 27.02 },
	{ time: '2018-12-25', value: 27.32 },
	{ time: '2018-12-26', value: 25.17 },
	{ time: '2018-12-27', value: 28.89 },
	{ time: '2018-12-28', value: 25.46 },
	{ time: '2018-12-29', value: 23.92 },
	{ time: '2018-12-30', value: 22.68 },
	{ time: '2018-12-31', value: 22.67 },
]

export const DashboardPage = () => {
	const navigate = useNavigate()
	const { clients } = useClientStore()
	const { rooms } = useRoomStore()
	const { services } = useServiceStore()

	return (
		<>
			<h1 className='text-5xl font-bold'>Dashboard</h1>
			<Spacer y={8} />
			<section>
				<ChartComponent
					/* {...props} */
					data={initialData}
				></ChartComponent>
			</section>
			<Spacer y={8} />
			<Divider />
			<Spacer y={8} />

			<section className='grid grid-cols-4 gap-4'>
				<Card className='scale-90 hover:scale-100'>
					<CardHeader className='text-4xl'>Clientes</CardHeader>
					<CardBody className='gap-3'>
						<ClientsIcon className='w-20 h-20 mx-auto' />
						<span className='text-3xl font-bold text-primary mx-auto'>
							{clients.length || 0}
						</span>
						<span className='text-sm font-thin text-gray-400 mx-auto'>
							N° de Clientes Registrados
						</span>
					</CardBody>
					<CardFooter>
						<Button
							className='mx-auto'
							color='primary'
							variant='flat'
							onClick={() => navigate('/admin/clientes')}
						>
							Ir a Clientes
						</Button>
					</CardFooter>
				</Card>
				<Card className='scale-90 hover:scale-100'>
					<CardHeader className='text-4xl'>Reservas</CardHeader>
					<CardBody className='gap-3'>
						<ReservationIcon className='w-20 h-20 mx-auto' />
						<span className='text-3xl font-bold text-primary mx-auto'>
							{services.length || 0}
						</span>
						<span className='text-sm font-thin text-gray-400 mx-auto'>
							N° de reservaciones
						</span>
					</CardBody>
					<CardFooter>
						<Button
							className='mx-auto'
							color='primary'
							variant='flat'
							onClick={() => navigate('/admin/reservaciones')}
						>
							Ir a Reservas
						</Button>
					</CardFooter>
				</Card>
				<Card className='scale-90 hover:scale-100'>
					<CardHeader className='text-4xl'>Habitaciones</CardHeader>
					<CardBody className='gap-3'>
						<BedIcon className='w-20 h-20 mx-auto' />
						<span className='text-3xl font-bold text-primary mx-auto'>
							{rooms.length || 0}
						</span>
						<span className='text-sm font-thin text-gray-400 mx-auto'>
							N° de habitaciones
						</span>
					</CardBody>
					<CardFooter>
						<Button
							className='mx-auto'
							color='primary'
							variant='flat'
							onClick={() => navigate('/admin/habitaciones')}
						>
							Ir a Habitaciones
						</Button>
					</CardFooter>
				</Card>
				<Card className='scale-90 hover:scale-100'>
					<CardHeader className='text-4xl'>Servicios</CardHeader>
					<CardBody className='gap-3'>
						<ServicesAditionalIcon className='w-20 h-20 mx-auto' />
						<span className='text-3xl font-bold text-primary mx-auto'>
							{services.length || 0}
						</span>
						<span className='text-sm font-thin text-gray-400 mx-auto'>
							Administra tus servicios adicionales
						</span>
					</CardBody>
					<CardFooter>
						<Button
							className='mx-auto'
							color='primary'
							variant='flat'
							onClick={() => navigate('/admin/servicios-adicionales')}
						>
							Ir a Servicios
						</Button>
					</CardFooter>
				</Card>
			</section>
		</>
	)
}
