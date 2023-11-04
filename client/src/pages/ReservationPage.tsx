import { LargeBanner } from '@/components'
import {
	Button,
	Input,
	Select,
	SelectItem,
	Spacer,
	Tab,
	Tabs,
} from '@nextui-org/react'
import React from 'react'
const ReservationPage = () => {
	const [selected, setSelected] = React.useState<string | number | bigint>(
		'reservas'
	)

	return (
		<main>
			<LargeBanner title='Reservaciones' />
			<Spacer y={10} />
			<section className='px-12 lg:px-[300px]'>
				<Tabs
					variant='light'
					aria-label='Tabs variants'
					key={'tabs-reservas'}
					selectedKey={selected}
					onSelectionChange={(key) => setSelected(key)}
				>
					<Tab
						key={'reservas'}
						title={'Tus Reservas'}
					>
						<p></p>
						<Select label='Elige tu Habitacion'>
							<SelectItem
								key={'1'}
								value='1'
							>
								1
							</SelectItem>
						</Select>
						<Input
							variant='flat'
							type='date'
							placeholder='Fecha de llegada'
							label='Fecha de llegada'
						/>
						<Input
							variant='flat'
							type='date'
							placeholder='Fecha de llegada'
							label='Fecha de salida'
						/>
						<Select label='N° de Personas'>
							<SelectItem
								key={'1'}
								value='1'
							>
								1
							</SelectItem>
						</Select>
						<Select
							label='Servicios Adicionales'
							selectionMode='multiple'
						>
							<SelectItem
								key={'1'}
								value='servicio1'
							>
								servicio1
							</SelectItem>
							<SelectItem
								key={'2'}
								value='servicio2'
							>
								servicio2
							</SelectItem>
						</Select>
						<Input
							isDisabled
							placeholder='Total S/.0.00'
						/>
						<Button
							variant='bordered'
							color='primary'
						>
							Reservar Habitacion
						</Button>
					</Tab>
					<Tab
						key={'reservar'}
						title={'Reservas Habitacion'}
					>
						<p className='min-h-[400px]'>Reservas</p>
					</Tab>
				</Tabs>
				<Spacer y={6} />
			</section>
		</main>
	)
}

export default ReservationPage
