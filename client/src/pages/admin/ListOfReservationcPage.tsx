import {
	ActionDropDown,
	ActionModal,
	InputForm,
	TableData,
	TopContent,
} from '@/components'
import { useConstants } from '@/constants'
import { COLUMNS_RESERVATIONS } from '@/constants/data'
import { useForm, useModal } from '@/hooks'
import {
	createReservation,
	deleteResevation,
} from '@/services/reserved_room.service'
import { useServiceStore } from '@/store/aditionalService.store'
import { useAuthStore } from '@/store/auth.store'
import { useClientStore } from '@/store/client.store'
import { useReservationStore } from '@/store/reservation.store'
import { useRoomStore } from '@/store/room.store'
import { Input, Select, SelectItem, Spacer } from '@nextui-org/react'
import React from 'react'
import { toast } from 'react-toastify'
export interface IReservation {
	id: string
	client: string
	room: string
	manager: string
	dateIn: string
	dateOut: string
	reservationDate: string
	numberPeople: number
	aditionalServices: string[]
	reservationState: string
	total: number
}

export const ListOfReservationcPage = () => {
	const { openModal, handleModal, isSavingData, setIsSavingData } = useModal()
	const { values, handleChange, resetInput } = useForm()
	const { RESERVATION_STATE } = useConstants()
	const [columnKeySelected, setColumnKeySelected] = React.useState<
		null | string
	>(null)
	const { user } = useAuthStore()
	const { rooms } = useRoomStore()
	const { clients } = useClientStore()
	const { services } = useServiceStore()
	const { reservations, createReservationStore, deleteReservationStore } =
		useReservationStore()

	const roomsAvalibles = React.useMemo(
		() => rooms.filter((room) => room.status === 'DISPONIBLE'),
		[rooms]
	)

	const total = React.useMemo(() => {
		let amount = 0
		if (values.room) {
			const room = rooms.find((r) => r.id === values.room)
			if (room?.category === 'PLATA') amount = 100
			if (room?.category === 'ORO') amount = 200
			if (room?.category === 'DIAMANTE') amount = 300
		}

		if (values.aditional_services) {
			const inputServiceID = values.aditional_services.split(',')
			for (let index = 0; index < inputServiceID.length; index++) {
				const element = inputServiceID[index]
				const service = services.find((s) => s.id === element)
				if (!service) continue
				amount += service.price
			}
		}

		return amount
	}, [rooms, services, values.aditional_services, values.room])

	const onOpenModalCreate = () => {
		resetInput()
		handleModal('create', true)
		setColumnKeySelected(null)
		setIsSavingData(true)
	}
	const onOpenModalEdit = React.useCallback(
		(id: string) => {
			setIsSavingData(false)
			setColumnKeySelected(id)
			/* 	const service = services.find((service) => service.id === id)
			if (!service) return
			values.name = service.name
			values.description = service.description
			values.price = service.price.toString() */
			handleModal('create', true)
		},
		[handleModal, setIsSavingData]
	)

	const onOpenModalDelete = React.useCallback(
		(id: string) => {
			handleModal('delete', true)
			setColumnKeySelected(id)
		},
		[handleModal]
	)

	const onCreate = async () => {
		try {
			const findClient = clients.find(
				(c) => c.number_of_document === values.client
			)
			if (!findClient) throw new Error('No se encontro el cliente')

			const res = await createReservation({
				dateIn: values.dateIn,
				dateOut: values.dateOut,
				numberPeople: parseInt(values.numberPeople),
				reservationState: values.reservationState,
				total: total,
				reservationDate: new Date().toISOString(),
				room: values.room,
				client: findClient.id,
				manager: user.id,
				aditionalServices: values.aditional_services
					? values.aditional_services.split(',')
					: [],
			})
			createReservationStore({
				...res,
				aditionalServices: res.aditionalServices
					.map((s: { name: string }) => s.name)
					.join(', '),
			})
			toast('Se creo la reservacion correctamente')
			handleModal('create', false)
		} catch (error) {
			toast('Ocurrio un error al crear', {
				type: 'error',
			})
		}
	}
	const onEdit = async () => {
		try {
			if (!columnKeySelected) return
			/* 	const update_service = {
				name: values.name,
				description: values.description,
				price: parseFloat(values.price),
			} */
			/* 	await updateService(columnKeySelected, update_service)

			updateServiceStore(columnKeySelected, {
				id: columnKeySelected,
				...update_service,
			}) */

			toast('Se edito el servicio adicional correctamente')

			handleModal('create', false)
		} catch (error) {
			toast('Ocurrio un error al editar el servicio adicional', {
				type: 'error',
			})
			console.log(error)
		}
	}

	const onDelete = () => {
		try {
			if (!columnKeySelected) return
			deleteResevation(columnKeySelected)
			deleteReservationStore(columnKeySelected)
			setColumnKeySelected(null)
			toast('Se elimino la reservacion correctamente')
			handleModal('delete', false)
		} catch (error) {
			toast('Ocurrio un error al eliminar', {
				type: 'error',
			})
			console.log(error)
		}
	}

	const renderCell = React.useCallback(
		(item: IReservation, columnKey: React.Key) => {
			const cellValue = item[columnKey as keyof IReservation]

			switch (columnKey) {
				case 'id':
					return <p>{cellValue.toString().slice(0, 7)}</p>
				case 'client':
					return <p>{cellValue}</p>
				case 'room':
					return <p>{cellValue}</p>
				case 'dateIn':
					return <p>{new Date(cellValue as string).toLocaleDateString()}</p>
				case 'dateOut':
					return <p>{new Date(cellValue as string).toLocaleDateString()}</p>
				case 'reservationDate':
					return <p>{new Date(cellValue as string).toLocaleDateString()}</p>
				case 'numberPeople':
					return <p>{cellValue}</p>
				case 'aditionalServices':
					return <p>{cellValue}</p>
				case 'reservationState':
					return <p>{cellValue}</p>
				case 'total':
					return <p>S/.{cellValue}</p>
				case 'actions':
					return (
						<div className='relative flex justify-end items-center gap-2'>
							<ActionDropDown
								ariaLabel='Dropdown of services actions'
								actionEdit={() => onOpenModalEdit(item.id)}
								actionDelete={() => onOpenModalDelete(item.id)}
							/>
						</div>
					)

				default:
					return cellValue
			}
		},
		[onOpenModalDelete, onOpenModalEdit]
	)

	return (
		<>
			<h1 className='text-5xl font-bold'>Reservaciones</h1>
			<Spacer y={8} />
			<TableData
				ariaLabel='Table of services'
				topContent={
					<TopContent
						filter={values.filter}
						handleChange={handleChange}
						onOpenModalCreate={onOpenModalCreate}
						buttonText='Agregar una reservación'
						placeholder='Buscar por cliente'
					/>
				}
				columns={COLUMNS_RESERVATIONS}
				items={reservations}
				renderCell={renderCell}
			/>
			<ActionModal
				title={
					isSavingData
						? 'Agregar un servicio adicional'
						: 'Editar un servicio adicional'
				}
				openModal={openModal.create}
				setOpenModal={() => {
					handleModal('create', false)
				}}
				button={{
					color: 'primary',
					onPress: () => {
						isSavingData ? onCreate() : onEdit()
					},
					text: isSavingData ? 'Guardar' : 'Editar',
				}}
			>
				<>
					<InputForm
						label='DNI del Cliente'
						name='client'
						value={values.client}
						handleChange={handleChange}
						autoFocus
					/>

					<Select
						label='Habitacion NN-CAT-PS'
						onChange={handleChange}
						value={values.room}
						name='room'
					>
						{roomsAvalibles.map((item) => (
							<SelectItem
								key={item.id}
								value={item.id}
							>
								{item.roomNumber + ' - ' + item.category + ' - ' + item.floor}
							</SelectItem>
						))}
					</Select>
					<Input
						name='dateIn'
						value={values.dateIn || ''}
						onChange={handleChange}
						label='Fecha de llegada:'
						type='date'
						labelPlacement='outside-left'
					/>
					<Input
						name='dateOut'
						value={values.dateOut || ''}
						onChange={handleChange}
						label='Fecha de salida:'
						type='date'
						labelPlacement='outside-left'
					/>
					<Select
						label='Servicios Adicionales'
						selectionMode='multiple'
						name='aditional_services'
						value={values.aditional_services}
						onChange={handleChange}
					>
						{services.map((item) => (
							<SelectItem key={item.id}>
								{item.name + ' - ' + item.price}
							</SelectItem>
						))}
					</Select>
					<Select
						label='Estado de reservacion'
						name='reservationState'
						value={values.reservationState}
						onChange={handleChange}
					>
						{RESERVATION_STATE.map((item) => (
							<SelectItem
								key={item.value}
								value={item.value}
							>
								{item.label}
							</SelectItem>
						))}
					</Select>
					<Select
						label='N° de Personas'
						name='numberPeople'
						onChange={handleChange}
						value={values.numberPeople}
					>
						<SelectItem
							key={'1'}
							value={'1'}
						>
							1
						</SelectItem>
						<SelectItem
							key={'2'}
							value={'2'}
						>
							2
						</SelectItem>
						<SelectItem
							key={'3'}
							value={'3'}
						>
							3
						</SelectItem>
					</Select>

					<Input
						placeholder='Total S/.0.00'
						label='Total'
						value={'S./' + total.toString()}
						isDisabled
					/>
				</>
			</ActionModal>
			<ActionModal
				title={'Eliminar un servicio adicional'}
				openModal={openModal.delete}
				setOpenModal={() => {
					handleModal('delete', false)
				}}
				button={{
					color: 'danger',
					onPress: () => {
						onDelete()
					},
					text: 'Eliminar',
				}}
			>
				<p>¿Esta seguro que desea eliminar la reservacion?</p>
			</ActionModal>
		</>
	)
}
