import {
	ActionDropDown,
	ActionModal,
	TableData,
	TopContent,
} from '@/components'
import { useConstants } from '@/constants'
import { COLUMNS_ROOMS } from '@/constants/data'
import { useForm, useModal } from '@/hooks'
import {
	createRoomService,
	deleteRoomService,
	updateRoomService,
} from '@/services/rooms.services'
import { useRoomStore } from '@/store/room.store'
import { Chip, Select, SelectItem, Spacer } from '@nextui-org/react'
import { DotIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify'

export interface IRooms {
	id: string
	status: string
	category: string
	floor: number
}

const RoomsPage = () => {
	const { rooms, createRoomStore, deleteRoomStore, updateRoomStore } =
		useRoomStore()
	const { openModal, handleModal, isSavingData, setIsSavingData } = useModal()
	const { values, handleChange, resetInput } = useForm()
	const [columnKeySelected, setColumnKeySelected] = React.useState<
		null | string
	>(null)
	const { ROOMS_CATEGORY, ROOM_STATE } = useConstants()

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
			const room = rooms.find((r) => r.id === id)
			if (!room) return
			values.category = room.category
			values.floor = room.floor.toString()
			values.status = room.status
			handleModal('create', true)
		},
		[handleModal, rooms, values, setIsSavingData]
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
			const room = {
				category: values.category,
				floor: parseInt(values.floor),
				status: values.status,
			}
			const res = (await createRoomService(room)) as IRooms
			createRoomStore(res)
			toast('Se creo el servicio adicional correctamente')
			handleModal('create', false)
		} catch (error) {
			toast('Ocurrio un error al crear el servicio adicional', {
				type: 'error',
			})
		}
	}
	const onEdit = async () => {
		try {
			if (!columnKeySelected) return
			const update_room = {
				id: columnKeySelected,
				category: values.category,
				floor: parseInt(values.floor),
				status: values.status,
			}
			const updateRoom = await updateRoomService(update_room)

			updateRoomStore({
				id: updateRoom.id,
				floor: updateRoom.floor,
				category: updateRoom.categoryRoom,
				status: updateRoom.state,
			})

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
			deleteRoomService(columnKeySelected)
			deleteRoomStore(columnKeySelected)
			setColumnKeySelected(null)
			toast('Se elimino el servicio adicional correctamente')
			handleModal('delete', false)
		} catch (error) {
			toast('Ocurrio un error al eliminar el servicio adicional', {
				type: 'error',
			})
			console.log(error)
		}
	}

	const renderCell = React.useCallback(
		(item: IRooms, columnKey: React.Key) => {
			const cellValue = item[columnKey as keyof IRooms]

			switch (columnKey) {
				case 'id':
					return <p>{cellValue.toString().slice(0, 7)}</p>
				case 'category':
					return <p>{cellValue}</p>
				case 'floor':
					return <p>{cellValue}</p>
				case 'status':
					return (
						<Chip
							size='md'
							variant='shadow'
							startContent={<DotIcon />}
							radius='sm'
							color={
								cellValue === 'DISPONIBLE'
									? 'success'
									: cellValue === 'MANTENIMIENTO'
									? 'warning'
									: 'danger'
							}
						>
							{cellValue}
						</Chip>
					)
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
			<h1 className='text-5xl font-bold'>Habitaciones</h1>
			<Spacer y={8} />
			<TableData
				ariaLabel='Table of services'
				topContent={
					<TopContent
						filter={values.filter}
						handleChange={handleChange}
						onOpenModalCreate={onOpenModalCreate}
					/>
				}
				columns={COLUMNS_ROOMS}
				items={rooms}
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
					<Select
						label='Categoria'
						name='category'
						value={values.category}
						onChange={handleChange}
						defaultSelectedKeys={
							values.category && values.category === 'DIAMANTE'
								? '0'
								: values.category === 'ORO'
								? '1'
								: values.category === 'PLATA'
								? '2'
								: ''
						}
					>
						{ROOMS_CATEGORY.map((item) => (
							<SelectItem
								key={item.value}
								value={item.value}
							>
								{item.label}
							</SelectItem>
						))}
					</Select>
					<Select
						name='floor'
						value={values.floor}
						onChange={handleChange}
						label='Piso'
						defaultSelectedKeys={values.floor && [values.floor]}
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
					<Select
						label='Estado'
						value={values.status}
						name='status'
						onChange={handleChange}
						defaultSelectedKeys={
							values.status && values.status === 'DISPONIBLE'
								? '0'
								: values.status === 'OCUPADO'
								? '1'
								: values.status === 'MANTENIMIENTO'
								? '2'
								: ''
						}
					>
						{ROOM_STATE.map((item) => (
							<SelectItem
								key={item.value}
								value={item.value}
							>
								{item.label}
							</SelectItem>
						))}
					</Select>
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
				<p>¿Esta seguro que desea eliminar el servicio adicional?</p>
			</ActionModal>
		</>
	)
}

export default RoomsPage
