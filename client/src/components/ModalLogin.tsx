import { EmailIcon, PasswordIcon } from '@/icons'
import {
	Button,
	Checkbox,
	Input,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react'
import { IModalAuthProps } from './component'
import { useNavigate } from 'react-router-dom'

export const ModalLogin = ({ isOpen, onOpenChange }: IModalAuthProps) => {
	const navigate = useNavigate()

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement='top-center'
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Inicia Sesión
						</ModalHeader>
						<ModalBody>
							<Input
								autoFocus
								endContent={
									<EmailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Email'
								placeholder='Enter your email'
								variant='bordered'
							/>
							<Input
								endContent={
									<PasswordIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Password'
								placeholder='Enter your password'
								type='password'
								variant='bordered'
							/>
							<div className='flex py-2 px-1 justify-between'>
								<Checkbox
									classNames={{
										label: 'text-small',
									}}
								>
									Recordarme
								</Checkbox>
								<Link
									color='primary'
									href='#'
									size='sm'
								>
									Forgot password?
								</Link>
							</div>
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
								onPress={() => navigate('/admin')}
							>
								Ingresar
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
