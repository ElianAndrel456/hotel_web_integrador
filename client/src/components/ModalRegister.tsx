import { UserIcon } from 'lucide-react'
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
import { useUIStore } from '@/store/ui.store'
import { useState } from 'react'
import { register_service_client } from '@/services/auth.service'

export interface UserAccountI {
	username: string
	password: string
	email: string
	lastname: string
	type_of_document: string
	number_of_document: string
	phone: string
	name: string
}

export const ModalRegister = () => {
	const { TYPE_OF_DOCUMENTS } = useConstants()
	const { openModalRegister, changeModalRegister, changeModalLogin } =
		useUIStore()
	const [inputName, setInputName] = useState('')
	const [inputLastName, setInputLastName] = useState('')
	const [inputTypeOfDocument, setInputTypeOfDocument] = useState('')
	const [inputNumberDocument, setInputNumberDocument] = useState('')
	const [inputPhone, setInputPhone] = useState('')
	const [inputEmail, setInputEmail] = useState('')
	const [inputUser, setInputUser] = useState('')
	const [inputPassword, setInputPassword] = useState('')

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const userAccount = {
			name: inputName,
			lastname: inputLastName,
			email: inputEmail,
			type_of_document: inputTypeOfDocument,
			number_of_document: inputNumberDocument,
			phone: inputPhone,
			username: inputUser,
			password: inputPassword,
		} as UserAccountI

		try {
			register(userAccount)
				.then(() => {
					changeModalRegister(false)
					changeModalLogin(true)
				})
				.catch((error) => {
					console.log(error)
				})
		} catch (error) {
			console.log(error)
		}
	}
	async function register(create_user: UserAccountI) {
		await register_service_client(create_user)
	}

	return (
		<Modal
			isOpen={openModalRegister}
			onOpenChange={() => changeModalRegister(!openModalRegister)}
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
								value={inputName}
								onChange={(e) => setInputName(e.target.value)}
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
								value={inputLastName}
								onChange={(e) => setInputLastName(e.target.value)}
							/>
							<Select
								isRequired
								label='Seleccione su tipo de documento'
								className='max-w-xs'
								value={inputTypeOfDocument}
								onChange={(e) => setInputTypeOfDocument(e.target.value)}
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
								type='number'
								minLength={8}
								value={inputNumberDocument}
								onChange={(e) => setInputNumberDocument(e.target.value)}
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
								value={inputPhone}
								onChange={(e) => setInputPhone(e.target.value)}
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
								type='email'
								value={inputEmail}
								onChange={(e) => setInputEmail(e.target.value)}
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
								value={inputUser}
								onChange={(e) => setInputUser(e.target.value)}
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
								value={inputPassword}
								onChange={(e) => setInputPassword(e.target.value)}
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
								Registrarse
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
