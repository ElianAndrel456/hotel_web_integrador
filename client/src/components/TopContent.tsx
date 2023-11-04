import { Button, Input } from '@nextui-org/react'
import { SearchIcon } from 'lucide-react'
import { IoAddOutline } from 'react-icons/io5'
interface ITopContentProps {
	onOpenModalCreate: () => void
	filter: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TopContent = ({
	onOpenModalCreate,
	filter,
	handleChange,
}: ITopContentProps) => {
	return (
		<div className='flex justify-between'>
			<Input
				isClearable
				placeholder='Buscar por nombre de servicio'
				startContent={<SearchIcon />}
				type='text'
				className='w-[350px]'
				value={filter}
				onChange={handleChange}
			/>
			<Button
				color='primary'
				variant='flat'
				startContent={<IoAddOutline />}
				onClick={onOpenModalCreate}
			>
				Agregar un servicio
			</Button>
		</div>
	)
}
