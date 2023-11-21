import { useUIStore } from '@/store/ui.store'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react'
import { InputForm } from '.'
import { useForm } from '@/hooks'
import { code_verify_service } from '@/services/auth.service'
import { toast } from 'react-toastify'

export const ModalCode = () => {
	const { openModalCode, changeModalCode, changeModalLogin } = useUIStore()
	const { values, handleChange, resetInput } = useForm()

	const onSubmit = async () => {
		try {
			await code_verify_service(values.code)

			resetInput()
			changeModalCode(false)
			changeModalLogin(true)
			toast.success('Cuenta verificada')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Modal
			isOpen={openModalCode}
			onOpenChange={() => changeModalCode(!openModalCode)}
			placement='top-center'
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Modal de Registro
						</ModalHeader>
						<ModalBody>
							<p className='text-sm text-gray-600'>
								Se ha enviado un codigo de 6 digitos a su correo electronico por
								favor revisar en la carpeta de span
							</p>
							<InputForm
								label='Ingrese el codigo de 6 '
								name='code'
								value={values.code}
								handleChange={handleChange}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='flat'
								onPress={onClose}
							>
								Cerrar
							</Button>
							<Button
								color='primary'
								onClick={onSubmit}
							>
								verificar
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
