import { UserIcon } from 'lucide-react'
import { IModalAuthProps } from './component'
import {
	Button,
	Divider,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
} from '@nextui-org/react'
import { useConstants } from '@/constants'
import { EmailIcon, PassportIcon, PasswordIcon, PhoneIcon } from '@/icons'

export const ModalRegister = ({ isOpen, onOpenChange }: IModalAuthProps) => {
	const { TYPE_OF_DOCUMENTS } = useConstants()

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
							Registrate
						</ModalHeader>
						<ModalBody>
							<Input
								isRequired
								autoFocus
								endContent={
									<UserIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Nombre'
								placeholder='Ingrese su nombre'
								variant='bordered'
							/>
							<Input
								isRequired
								autoFocus
								endContent={
									<UserIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Apellido'
								placeholder='Ingrese su apellido'
								variant='bordered'
							/>
							<Select
								isRequired
								label='Seleccione su tipo de documento'
								className='max-w-xs'
							>
								{TYPE_OF_DOCUMENTS.map((t) => (
									<SelectItem
										key={t.value}
										value={t.value}
									>
										{t.label}
									</SelectItem>
								))}
							</Select>
							<Input
								isRequired
								autoFocus
								endContent={
									<PassportIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='N° de Documento'
								placeholder='Ingrese su numero de documento'
								variant='bordered'
							/>
							<Input
								isRequired
								autoFocus
								endContent={
									<PhoneIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Celular'
								placeholder='Ingrese su numero de celular'
								variant='bordered'
								type='number'
								minLength={9}
							/>
							<Input
								isRequired
								autoFocus
								endContent={
									<UserIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Email'
								placeholder='Ingrese su correo electronico'
								variant='bordered'
							/>
							<Divider />
							<Input
								isRequired
								autoFocus
								endContent={
									<EmailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Usuario'
								placeholder='Ingrese su usuario'
								variant='bordered'
							/>
							<Input
								isRequired
								endContent={
									<PasswordIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Constreseña'
								placeholder='Ingrese su contraseña'
								type='password'
								variant='bordered'
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
								onPress={onClose}
							>
								Registrarse
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
