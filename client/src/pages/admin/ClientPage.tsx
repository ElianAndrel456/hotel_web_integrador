import { COLUMNS_CLIENT, DATA_OF_CLIENTS } from '@/constants/data'
import { VerticalDotsIcon } from '@/icons/VerticalDotsIcon'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Pagination,
	Spacer,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react'
import { SearchIcon } from 'lucide-react'
import React from 'react'
import { IoAddOutline } from 'react-icons/io5'

interface IClients {
	dni: string
	name: string
	type_of_document: string
	phone: string
	email: string
}

export const ClientPage = () => {
	const [clients, setClients] = React.useState<IClients[]>([])
	const [filter, setFilter] = React.useState<string>('')
	/* const [page, setPage] = React.useState<number>(1) */

	React.useEffect(() => {
		/* const fetchClients = async () => {
      const res = await fetch('http://localhost:5000/clients')
      const data = await res.json()
      setClients(data)
    }
    fetchClients() */
		setClients(DATA_OF_CLIENTS)
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
							<Dropdown
								aria-label='actions_table'
								className='bg-background border-1 border-default-200'
							>
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
								<DropdownMenu>
									<DropdownItem>View</DropdownItem>
									<DropdownItem>Edit</DropdownItem>
									<DropdownItem>Delete</DropdownItem>
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
		</>
	)
}
