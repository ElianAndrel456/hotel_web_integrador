import { COLUMNS_CLIENT } from '@/constants/data'
import { Divider, Spacer } from '@nextui-org/react'
import React, { useState } from 'react'
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
import { EmailIcon, PassportIcon, PasswordIcon } from '@/icons'
import { PhoneIcon, UserIcon } from 'lucide-react'
import { ZodError, ZodIssue, z } from 'zod'

export interface IClients {
	id: string
	names: string
	email: string
	phone: string
	dni: string
	address: string
}

const registerSchema = z.object({
	names: z
		.string()
		.min(3, { message: 'Nombre muy corto' })
		.regex(/^[a-zA-Z ]/, 'Solo letras'),
	dni: z
		.string()
		.min(8, { message: 'Deberia tener 8 digitos' })
		.regex(/^[0-9]{8}$/, 'Solo numeros y 8 digitos'),
	address: z.string().min(3, { message: 'Dirección muy corta' }),
	phone: z
		.string()
		.min(9, { message: 'Deberia tener 9 digitos' })
		.regex(/^[0-9]{9}$/, 'Solo numeros y 9 digitos'),
	email: z.string().email({ message: 'Email invalido' }),
	password: z
		.string()
		.min(8, { message: 'Contraseña debe tener como minimo 8 caracteres' })
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
			'Debe contener al menos una mayúscula, una minúscula y un número'
		),
})

export const ClientPage = () => {
	const { clients, addClientStore, deleteClientStore, updateClientStore } =
		useClientStore()
	const { handleModal, isSavingData, openModal, setIsSavingData } = useModal()
	const { handleChange, resetInput, values, setValues } = useForm()
	const [columnKeySelected, setColumnKeySelected] = React.useState<
		null | string
	>(null)
	const [errors, setErrors] = useState<ZodIssue[]>([])

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
			setValues({
				names: client.names,
				dni: client.dni,
				address: client.address,
				phone: client.phone,
				email: client.email,
			})
			handleModal('create', true)
		},
		[setIsSavingData, clients, setValues, handleModal]
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
				names: values.names,
				dni: values.dni,
				email: values.email,
				address: values.address,
				phone: values.phone,
				password: values.password,
			}

			const parse = registerSchema.parse(client)
			console.log(parse)

			const res = (await createClienteService(client)) as IClients

			addClientStore(res)
			toast('Se creo el servicio adicional correctamente')
			handleModal('create', false)
		} catch (error) {
			toast('Ocurrio un error al crear el cliente', {
				type: 'error',
			})
			if (typeof error !== 'string' && error instanceof ZodError) {
				setErrors(error.issues)
			}
		}
	}
	const onEdit = async () => {
		try {
			if (!columnKeySelected) return
			const update_room = {
				id: columnKeySelected,
				names: values.names,
				email: values.email,
				phone: values.phone,
				dni: values.dni,
				address: values.address,
			}
			const updateClient = await updateClienteService(update_room)

			updateClientStore({
				id: updateClient.id,
				email: updateClient.email,
				address: updateClient.address,
				dni: updateClient.dni,
				names: updateClient.names,
				phone: updateClient.phone,
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
						label='Nombres'
						name='names'
						value={values.names}
						handleChange={handleChange}
						EndContent={
							<UserIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
						}
						isValid={errors.some((error) => error.path[0] === 'names')}
						errorMessage={
							errors
								.filter((error) => error.path[0] === 'names')
								.map((error) => error.message)[0]
						}
					/>
					<InputForm
						label='N° de Documento | DNI'
						name='dni'
						value={values.dni}
						handleChange={handleChange}
						type='number'
						EndContent={
							<PassportIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
						}
						isValid={errors.some((error) => error.path[0] === 'dni')}
						errorMessage={
							errors
								.filter((error) => error.path[0] === 'dni')
								.map((error) => error.message)[0]
						}
					/>
					<InputForm
						label='Dirección'
						name='address'
						value={values.address}
						handleChange={handleChange}
						EndContent={
							<PassportIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
						}
						isValid={errors.some((error) => error.path[0] === 'address')}
						errorMessage={
							errors
								.filter((error) => error.path[0] === 'address')
								.map((error) => error.message)[0]
						}
					/>
					<InputForm
						EndContent={
							<PhoneIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
						}
						label='Celular'
						name='phone'
						value={values.phone}
						type='number'
						handleChange={handleChange}
						isValid={errors.some((error) => error.path[0] === 'phone')}
						errorMessage={
							errors
								.filter((error) => error.path[0] === 'phone')
								.map((error) => error.message)[0]
						}
					/>

					{isSavingData ? (
						<>
							<Divider />
							<InputForm
								EndContent={
									<EmailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Email'
								variant='bordered'
								type='email'
								name='email'
								value={values.email}
								handleChange={handleChange}
								isValid={errors.some((error) => error.path[0] === 'email')}
								errorMessage={
									errors
										.filter((error) => error.path[0] === 'email')
										.map((error) => error.message)[0]
								}
							/>
							<InputForm
								EndContent={
									<PasswordIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Constreseña'
								type='password'
								variant='bordered'
								name='password'
								value={values.password}
								handleChange={handleChange}
								isValid={errors.some((error) => error.path[0] === 'password')}
								errorMessage={
									errors
										.filter((error) => error.path[0] === 'password')
										.map((error) => error.message)[0]
								}
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
