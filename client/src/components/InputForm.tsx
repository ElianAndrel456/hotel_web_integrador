import { Input } from '@nextui-org/react'
import React from 'react'

interface IInputFormProps {
	value: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	name: string
	label?: string
	autoFocus?: boolean
	type?:
		| 'text'
		| 'number'
		| 'password'
		| 'email'
		| 'tel'
		| 'search'
		| 'date'
		| 'file'
	isDisabled?: boolean
	variant?: 'bordered' | 'flat'
	EndContent?: JSX.Element
	errorMessage?: string
	isValid?: boolean
}

export const InputForm = ({
	handleChange,
	name,
	value,
	label,
	autoFocus,
	type = 'text',
	isDisabled,
	variant = 'bordered',
	EndContent,
	errorMessage,
	isValid,
}: IInputFormProps) => {
	return (
		<Input
			isRequired
			autoFocus={autoFocus}
			label={label}
			variant={variant}
			value={value || ''}
			name={name}
			onChange={handleChange}
			type={type}
			min={type === 'number' ? 0 : undefined}
			isDisabled={isDisabled ?? false}
			endContent={EndContent ?? ''}
			isInvalid={isValid ?? false}
			errorMessage={errorMessage ?? ''}
		/>
	)
}
