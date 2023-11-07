import {
	ActionDropDown,
	ActionModal,
	InputForm,
	TableData,
	TextAreaForm,
	TopContent,
} from '@/components'
import { COLUMNS_SERVICES } from '@/constants/data'
import { useModal, useForm } from '@/hooks'
import {
	createService,
	deleteService,
	updateService,
} from '@/services/aditional_services.service'
import { useServiceStore } from '@/store/aditionalService.store'
import { Spacer } from '@nextui-org/react'
import React from 'react'
import { toast } from 'react-toastify'

export interface IServices {
	id: string
	name: string
	description: string
	price: number
}

export const AditionalServicesPage = () => {
	const { services, addServiceStore, deleteServiceStore, updateServiceStore } =
		useServiceStore()
	const { openModal, handleModal, isSavingData, setIsSavingData } = useModal()
	const { values, handleChange, resetInput } = useForm()
	const [columnKeySelected, setColumnKeySelected] = React.useState<
		null | string
	>(null)

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
			const service = services.find((service) => service.id === id)
			if (!service) return
			values.name = service.name
			values.description = service.description
			values.price = service.price.toString()
			handleModal('create', true)
		},
		[handleModal, services, values, setIsSavingData]
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
			const res = await createService({
				name: values.name,
				description: values.description,
				price: parseFloat(values.price),
			})
			addServiceStore(res)
			toast('Se creo el servicio adicional correctamente')
			handleModal('create', false)
		} catch (error) {
			toast('Ocurrio un error', {
				type: 'error',
			})
		}
	}
	const onEdit = async () => {
		try {
			if (!columnKeySelected) return
			const update_service = {
				name: values.name,
				description: values.description,
				price: parseFloat(values.price),
			}
			await updateService(columnKeySelected, update_service)

			updateServiceStore(columnKeySelected, {
				id: columnKeySelected,
				...update_service,
			})

			toast('Se edito el servicio adicional correctamente')

			handleModal('create', false)
		} catch (error) {
			toast('Ocurrio un error', {
				type: 'error',
			})
			console.log(error)
		}
	}

	const onDelete = () => {
		try {
			if (!columnKeySelected) return
			deleteService(columnKeySelected)
			deleteServiceStore(columnKeySelected)
			setColumnKeySelected(null)
			toast('Se elimino el servicio adicional correctamente')
			handleModal('delete', false)
		} catch (error) {
			toast('Ocurrio un error', {
				type: 'error',
			})
			console.log(error)
		}
	}

	const renderCell = React.useCallback(
		(item: IServices, columnKey: React.Key) => {
			const cellValue = item[columnKey as keyof IServices]

			switch (columnKey) {
				case 'id':
					return <p>{cellValue.toString().slice(0, 7)}</p>
				case 'name':
					return <p>{cellValue}</p>
				case 'description':
					return <p>{cellValue}</p>
				case 'price':
					return <p>{cellValue}</p>
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
			<h1 className='text-5xl font-bold'>Servicios Adicionales</h1>
			<Spacer y={8} />
			<TableData
				ariaLabel='Table of services'
				topContent={
					<TopContent
						filter={values.filter}
						handleChange={handleChange}
						onOpenModalCreate={onOpenModalCreate}
						buttonText='Agregar un servicio adicional'
						placeholder='Buscar por nombre'
					/>
				}
				columns={COLUMNS_SERVICES}
				items={services}
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
						label='Nombre'
						name='name'
						value={values.name}
						handleChange={handleChange}
						autoFocus
					/>
					<TextAreaForm
						label='Descripcion'
						name='description'
						value={values.description}
						handleChange={handleChange}
					/>
					<InputForm
						label='Precio'
						name='price'
						value={values.price}
						handleChange={handleChange}
						type='number'
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
				<p>¿Esta seguro que desea eliminar el servicio adicional?</p>
			</ActionModal>
		</>
	)
}
