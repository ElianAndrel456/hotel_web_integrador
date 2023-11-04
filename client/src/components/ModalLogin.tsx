import { PasswordIcon, UserIcon } from '@/icons'
import { useAuthStore } from '@/store/auth.store'
import { useUIStore } from '@/store/ui.store'
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
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login_service } from '@/services/auth.service'

export const ModalLogin = () => {
	const navigate = useNavigate()
	const { openModalLogin, changeModalLogin, changeModalRegister } = useUIStore()
	const { changeIsAuth, setUser } = useAuthStore()
	const [inputUser, setInputUser] = useState('')
	const [inputPassword, setInputPassword] = useState('')

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const userAccount = {
			user: inputUser,
			password: inputPassword,
		}

		try {
			login_service(userAccount)
				.then((res) => {
					console.log(res)

					if (Object.prototype.hasOwnProperty.call(res, 'client')) {
						console.log('es cliente')
						setUser(res.client)
						changeModalLogin(false)
						changeIsAuth(true)
					} else if (Object.prototype.hasOwnProperty.call(res, 'manager')) {
						console.log('es manager')
						setUser(res.manager)
						changeModalLogin(false)
						changeIsAuth(true)
						navigate('/admin')
					} else {
						throw new Error('No se pudo identificar el tipo de usuario')
					}
				})
				.catch((err) => {
					console.log(err)
				})

			/* changeIsAuth(true)
			changeModalLogin(false) */
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Modal
			isOpen={openModalLogin}
			onOpenChange={() => {
				changeModalLogin(!openModalLogin)
			}}
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
									<UserIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Usuario'
								placeholder='Ingresa tu Usuario'
								variant='bordered'
								value={inputUser}
								onChange={(e) => setInputUser(e.target.value)}
							/>
							<Input
								endContent={
									<PasswordIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Contraseña'
								placeholder='Ingresa tu contraseña'
								type='password'
								variant='bordered'
								value={inputPassword}
								onChange={(e) => setInputPassword(e.target.value)}
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
									size='sm'
									onClick={() => {
										changeModalLogin(false)
										changeModalRegister(true)
									}}
								>
									Crear un nueva cuenta
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
								/* onPress={() => navigate('/admin')} */
								onClick={onSubmit}
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
