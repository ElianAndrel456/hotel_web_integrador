import { Textarea } from '@nextui-org/react'

interface ITextAreaFormProps {
	label: string
	name: string
	value: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextAreaForm = ({
	handleChange,
	label,
	name,
	value,
}: ITextAreaFormProps) => {
	return (
		<Textarea
			variant='bordered'
			label={label}
			name={name}
			value={value}
			onChange={handleChange}
		/>
	)
}
