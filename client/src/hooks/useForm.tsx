import React from 'react'

export const useForm = () => {
	const [values, setValues] = React.useState<Record<string, string>>({})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const resetInput = () => {
		setValues({})
	}

	return {
		values,
		handleChange,
		resetInput,
	}
}
