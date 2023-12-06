import { Button, Input } from '@nextui-org/react'
import { SearchIcon } from 'lucide-react'
import { IoAddOutline } from 'react-icons/io5'
interface ITopContentProps {
  onOpenModalCreate: () => void
  filter: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  buttonText?: string
}

export const TopContent = ({ onOpenModalCreate, filter, handleChange, buttonText, placeholder }: ITopContentProps) => {
  return (
    <div className='flex justify-between'>
      <Input
        isClearable
        placeholder={placeholder || 'Buscar'}
        startContent={<SearchIcon />}
        type='text'
        className='w-[350px]'
        name='filter'
        value={filter}
        onChange={handleChange}
      />
      <Button
        color='primary'
        variant='flat'
        startContent={<IoAddOutline />}
        onClick={onOpenModalCreate}
      >
        {buttonText || 'Agregar'}
      </Button>
    </div>
  )
}
