import { COLUMNS_RESERVATIONS, DATA_OF_RESERVATIONS } from '@/constants/data'
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
interface IReservation {
	id: number
	client: string
	room: string
	checkIn: string
	checkOut: string
	aditional_services: string
	status: string
}

export const ListOfReservationcPage = () => {
	const TopContent = React.useMemo(
		() => (
			<div className='flex justify-between'>
				<Input
					isClearable
					placeholder='Buscar cliente por nombre'
					startContent={<SearchIcon />}
					type='text'
					className='w-[250px]'
					/* value={filter} */
					/* 	onChange={(e) => setFilter(e.target.value)} */
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
		[]
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
		(item: IReservation, columnKey: React.Key) => {
			const cellValue = item[columnKey as keyof IReservation]

			switch (columnKey) {
				case 'id':
					return <p>{cellValue}</p>
				case 'client':
					return <p>{cellValue}</p>
				case 'room':
					return <p>{cellValue}</p>
				case 'checkIn':
					return <p>{cellValue}</p>
				case 'checkOut':
					return <p>{cellValue}</p>
				case 'status':
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
			<h1 className='text-5xl font-bold'>Reservaciones</h1>
			<Spacer y={8} />
			<Table
				aria-label='Table of clients'
				topContent={TopContent}
				bottomContent={bottomContent}
				bottomContentPlacement='outside'
				removeWrapper
				isCompact
			>
				<TableHeader columns={COLUMNS_RESERVATIONS}>
					{(column) => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					)}
				</TableHeader>
				<TableBody
					emptyContent={'No hay ningun cliente'}
					items={DATA_OF_RESERVATIONS}
				>
					{(item) => (
						<TableRow key={item.id}>
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
