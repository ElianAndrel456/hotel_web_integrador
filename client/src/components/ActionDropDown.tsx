import { VerticalDotsIcon } from '@/icons/VerticalDotsIcon'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react'

interface IActionDropDownProps {
	ariaLabel: string
	actionEdit?: () => void
	actionDelete?: () => void
}

export const ActionDropDown = ({
	ariaLabel,
	actionEdit,
	actionDelete,
}: IActionDropDownProps) => {
	return (
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
			<DropdownMenu aria-label={ariaLabel}>
				<DropdownItem
					color='primary'
					onClick={() => {
						actionEdit!()
					}}
				>
					Editar
				</DropdownItem>

				<DropdownItem
					color='danger'
					onClick={() => {
						actionDelete!()
					}}
				>
					Eliminar
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
