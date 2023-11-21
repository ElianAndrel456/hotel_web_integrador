import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
	const navigate = useNavigate()
	return (
		<div className='w-full h-screen bg-gray-50 flex items-center justify-center'>
			<Button
				onClick={() => {
					navigate('/')
				}}
				variant='bordered'
				color='primary'
			>
				Volver al Inicio
			</Button>
		</div>
	)
}
