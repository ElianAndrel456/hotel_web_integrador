import { COLUMNS_CLIENT } from '@/constants/data'
import { Select, SelectItem, Spacer } from '@nextui-org/react'
import React from 'react'
import { useConstants } from '@/constants/index'
import { useClientStore } from '@/store/client.store'
import { useForm, useModal } from '@/hooks'
import {
	ActionDropDown,
	ActionModal,
	InputForm,
	TableData,
	TopContent,
} from '@/components'
import { toast } from 'react-toastify'
import {
	createClienteService,
	deleteClienteService,
	updateClienteService,
} from '@/services/clients.service'

export interface IClients {
	id: string
	number_of_document: string
	name: string
	type_of_document: string
	phone: string
	email: string
}

export const ClientPage = () => {
	const { clients, addClientStore, deleteClientStore, updateClientStore } =
		useClientStore()
	const { handleModal, isSavingData, openModal, setIsSavingData } = useModal()
	const { handleChange, resetInput, values } = useForm()
	const [columnKeySelected, setColumnKeySelected] = React.useState<
		null | string
	>(null)
	const { TYPE_OF_DOCUMENTS } = useConstants()

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
			const client = clients.find((c) => c.id === id)
			console.log(client)
			if (!client) return
			values.name = client.name.split(' ')[0]
			values.lastName = client.name.split(' ')[1]
			values.email = client.email
			values.phone = client.phone
			values.type_of_document = client.type_of_document
			values.number_of_document = client.number_of_document

			handleModal('create', true)
		},
		[setIsSavingData, clients, values, handleModal]
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
			const client = {
				name: values.name,
				lastname: values.lastName,
				email: values.email,
				phone: values.phone,
				type_of_document: values.type_of_document,
				number_of_document: values.number_of_document,
				username: values.username,
				password: values.password,
			}
			const res = (await createClienteService(client)) as IClients
			console.log(res)

			addClientStore(res)
			toast('Se creo el servicio adicional correctamente')
			handleModal('create', false)
		} catch (error) {
			toast('Ocurrio un error al crear el cliente', {
				type: 'error',
			})
		}
	}
	const onEdit = async () => {
		try {
			if (!columnKeySelected) return
			const update_room = {
				id: columnKeySelected,
				name: values.name,
				lastname: values.lastName,
				email: values.email,
				phone: values.phone,
				type_of_document: values.type_of_document,
				number_of_document: values.number_of_document,
			}
			const updateClient = await updateClienteService(update_room)

			updateClientStore({
				email: updateClient.email,
				id: updateClient.id,
				name: updateClient.name + ' ' + updateClient.lastname,
				number_of_document: updateClient.number_of_document,
				phone: updateClient.phone,
				type_of_document: updateClient.type_of_document,
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
			deleteClienteService(columnKeySelected)
			deleteClientStore(columnKeySelected)
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
	console.log(clients)
	const renderCell = React.useCallback(
		(item: IClients, columnKey: React.Key) => {
			const cellValue = item[columnKey as keyof IClients]

			switch (columnKey) {
				case 'name':
					return <p>{cellValue}</p>
				case 'number_of_document':
					return <p>{cellValue}</p>
				case 'type_of_document':
					return <p>{cellValue}</p>
				case 'phone':
					return <p>{cellValue}</p>
				case 'email':
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
			<h1 className='text-5xl font-bold'>Listado de Clientes</h1>
			<Spacer y={8} />
			<TableData
				ariaLabel='Table of clients'
				topContent={
					<TopContent
						filter={values.filter}
						handleChange={handleChange}
						onOpenModalCreate={onOpenModalCreate}
						buttonText='Agregar un cliente'
						placeholder='Buscar un cliente por nombre'
					/>
				}
				columns={COLUMNS_CLIENT}
				items={clients}
				renderCell={renderCell}
			/>

			<ActionModal
				title={isSavingData ? 'Agregar un cliente' : 'Editar un cliente'}
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
						autoFocus
						name='name'
						value={values.name}
						handleChange={handleChange}
					/>
					<InputForm
						label='Apellido'
						name='lastName'
						value={values.lastName}
						handleChange={handleChange}
					/>

					<Select
						isRequired
						label='Seleccione su tipo de documento'
						className='max-w-xs'
						name='type_of_document'
						value={values.type_of_document}
						onChange={handleChange}
						defaultSelectedKeys={
							values.type_of_document && values.type_of_document === 'DNI'
								? '0'
								: values.type_of_document === 'PASAPORTE'
								? '1'
								: values.type_of_document === 'CARNET_EXTRANJERIA'
								? '2'
								: ''
						}
					>
						{TYPE_OF_DOCUMENTS.map((t) => (
							<SelectItem
								key={t.value}
								value={t.value}
							>
								{t.label}
							</SelectItem>
						))}
					</Select>
					<InputForm
						label='N° de Documento'
						name='number_of_document'
						value={values.number_of_document}
						handleChange={handleChange}
					/>
					<InputForm
						label='Celular'
						name='phone'
						value={values.phone}
						handleChange={handleChange}
						type='tel'
					/>
					<InputForm
						label='Email'
						name='email'
						value={values.email}
						handleChange={handleChange}
						type='email'
					/>
					{isSavingData ? (
						<>
							<InputForm
								label='Usuario'
								name='username'
								value={values.username}
								handleChange={handleChange}
							/>
							<InputForm
								label='Contraseña'
								name='password'
								value={values.password}
								handleChange={handleChange}
								type='password'
							/>
						</>
					) : (
						''
					)}
				</>
			</ActionModal>

			<ActionModal
				title={'Eliminar un cliente'}
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
				<p>¿Esta seguro que desea eliminar el cliente?</p>
			</ActionModal>
		</>
	)
}
