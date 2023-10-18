import { COLUMNS_CLIENT } from '@/constants/data'
import { PassportIcon } from '@/icons'
import { VerticalDotsIcon } from '@/icons/VerticalDotsIcon'
import { getAllClientes } from '@/services/clients.service'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Pagination,
	Select,
	SelectItem,
	Spacer,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import { PhoneIcon, SearchIcon, UserIcon } from 'lucide-react'
import React from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { useConstants } from '@/constants/index'
import { useClientStore } from '@/store/client.store'

export interface IClients {
	id: number
	dni: string
	name: string
	type_of_document: string
	phone: string
	email: string
}

export const ClientPage = () => {
	const { clients, setClients } = useClientStore()
	const [filter, setFilter] = React.useState<string>('')
	const [isOpenModalDelete, setIsOpenModalDelete] =
		React.useState<boolean>(false)
	const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
	const [isSave, setIsSave] = React.useState<boolean>(true)

	const { TYPE_OF_DOCUMENTS } = useConstants()

	React.useEffect(() => {
		const fetchClients = async () => {
			const data = await getAllClientes()
			console.log(data)
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
					dni: d.number_of_document,
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
	}, [])

	const filteredClients = React.useMemo(() => {
		if (filter) {
			return clients.filter((client) =>
				client.name.toLowerCase().includes(filter.toLowerCase())
			)
		}
		return clients
	}, [filter, clients])

	const TopContent = React.useMemo(
		() => (
			<div className='flex justify-between'>
				<Input
					isClearable
					placeholder='Buscar cliente por nombre'
					startContent={<SearchIcon />}
					type='text'
					className='w-[250px]'
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
				<Button
					color='primary'
					variant='flat'
					startContent={<IoAddOutline />}
					onClick={() => {
						setIsSave(true)
						setIsOpenModalEdit(true)
					}}
				>
					Agregar cliente
				</Button>
			</div>
		),
		[filter]
	)

	const bottomContent = React.useMemo(
		() => (
			<div className='flex justify-center'>
				<Pagination
					total={100}
					page={1}
					color='default'
					className='gap-2'
					showControls
					variant='light'
					radius='full'
					initialPage={1}
					onChange={(e) => console.log(e)}
				/>
			</div>
		),
		[]
	)

	const renderCell = React.useCallback(
		(item: IClients, columnKey: React.Key) => {
			const cellValue = item[columnKey as keyof IClients]

			switch (columnKey) {
				case 'name':
					return <p>{cellValue}</p>
				case 'dni':
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
							<Dropdown className='bg-background border-1 border-default-200'>
								<DropdownTrigger>
									<Button
										isIconOnly
										radius='full'
										size='sm'
										variant='light'
									>
										<VerticalDotsIcon />
									</Button>
								</DropdownTrigger>
								<DropdownMenu aria-label='Static Actions'>
									<DropdownItem
										onClick={() => {
											setIsSave(false)
											setIsOpenModalEdit(true)
										}}
									>
										Editar
									</DropdownItem>
									<DropdownItem
										onClick={() => setIsOpenModalDelete(true)}
										color='danger'
									>
										Eliminar
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					)

				default:
					return cellValue
			}
		},
		[]
	)

	return (
		<>
			<h1 className='text-5xl font-bold'>Listado de Clientes</h1>
			<Spacer y={8} />
			<Table
				aria-label='Table of clients'
				topContent={TopContent}
				bottomContent={bottomContent}
				bottomContentPlacement='outside'
				removeWrapper
			>
				<TableHeader columns={COLUMNS_CLIENT}>
					{(column) => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					)}
				</TableHeader>
				<TableBody
					emptyContent={'No hay ningun cliente'}
					items={filteredClients || clients}
				>
					{(item) => (
						<TableRow key={item.dni}>
							{(columnKey) => (
								<TableCell>{renderCell(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>

			<Modal
				isOpen={isOpenModalEdit}
				onOpenChange={() => setIsOpenModalEdit(!isOpenModalEdit)}
				placement='top-center'
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>
								{isSave ? 'Agregar Cliente' : 'Editar Cliente'}
							</ModalHeader>
							<ModalBody>
								<Input
									isRequired
									autoFocus
									endContent={
										<UserIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Nombre'
									placeholder='Ingrese su nombre'
									variant='bordered'
								/>
								<Input
									isRequired
									autoFocus
									endContent={
										<UserIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Apellido'
									placeholder='Ingrese su apellido'
									variant='bordered'
								/>
								<Select
									isRequired
									label='Seleccione su tipo de documento'
									className='max-w-xs'
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
								<Input
									isRequired
									autoFocus
									endContent={
										<PassportIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='N° de Documento'
									placeholder='Ingrese su numero de documento'
									variant='bordered'
								/>
								<Input
									isRequired
									autoFocus
									endContent={
										<PhoneIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Celular'
									placeholder='Ingrese su numero de celular'
									variant='bordered'
									type='number'
									minLength={9}
								/>
								<Input
									isRequired
									autoFocus
									endContent={
										<UserIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Email'
									placeholder='Ingrese su correo electronico'
									variant='bordered'
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color='warning'
									variant='flat'
									onPress={onClose}
								>
									Cerrar
								</Button>
								<Button
									color='primary'
									onPress={() => {}}
								>
									{isSave ? 'Guardar' : 'Editar'}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>

			{/* ELIMINAR MODAL */}
			<Modal
				isOpen={isOpenModalDelete}
				onOpenChange={() => setIsOpenModalDelete(!isOpenModalDelete)}
				placement='top-center'
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>¿Estas segurdo de eliminar al cliente?</ModalHeader>
							<ModalBody>
								<p className='text-gray-400 text-sm font-thin'>
									Se eliminara al cliente permantemente de la base de datos
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color='warning'
									variant='flat'
									onPress={onClose}
								>
									Cerrar
								</Button>
								<Button
									color='danger'
									onPress={() => {}}
								>
									Eliminar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
