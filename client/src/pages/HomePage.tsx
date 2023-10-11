import { BiLockAlt } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalContent,
	Checkbox,
	Input,
	Link,
	Button,
	Divider,
	Select,
	SelectItem,
	Image,
} from '@nextui-org/react'
import { Footer, Navigation, CardRoom } from '@/components'
import { useScrollY, useModal } from '@/hooks'
import { useConstants } from '@/constants'
import {
	PasswordIcon,
	PassportIcon,
	PhoneIcon,
	UserIcon,
	ArrowDownCircleIcon,
} from '@/icons'

const HomePage = () => {
	const { scroll } = useScrollY()
	const { TYPE_OF_DOCUMENTS } = useConstants()

	const {
		onOpenChangeLogin,
		isOpenLogin,
		isOpenRegister,
		onOpenChangeRegister,
		onOpenLogin,
		onOpenRegister,
	} = useModal()

	return (
		<>
			<Navigation
				onOpenLogin={onOpenLogin}
				onOpenRegister={onOpenRegister}
			/>
			<main>
				<header className='text-white bg-hero-pattern bg-[rgba(0,0,0,0.5)] bg-blend-darken bg-no-repeat bg-cover bg-fixed min-h-screen w-full gap-4 flex relative justify-center items-center flex-col'>
					<h1 className='text-5xl font-bold '>
						<span>Hotel </span>
						Waynapicchu
					</h1>
					<p className='text-lg font-semibold text-gray-300'>
						Welcome to the Hotel Waynapicchu, the best hotel in the world!
					</p>
					<a
						href='#reservation'
						className='absolute bottom-20'
					>
						{scroll > 200 ? (
							''
						) : (
							<ArrowDownCircleIcon className='text-4xl animate-bounce' />
						)}
					</a>
				</header>
				<section className='py-16 px-[300px]'>
					<div className='w-full grid gap-8 grid-cols-2 items-center'>
						<div className='text-center space-y-8'>
							<h3 className='text-3xl'>Relájate en nuestra Suite</h3>
							<p className=''>
								Nuestra Suite es probablemente el ambiente que más refleja la
								personalidad del habitante y el más laborioso de planear. El
								espacio requiere confort, hospitalidad y estilo para recibir los
								momentos más íntimos del usuario. Es allí donde están nuestros
								recuerdos más profundos, nuestras piezas favoritas
							</p>
						</div>
						<div>
							<Image
								isZoomed
								isBlurred
								src='https://waynapicchuhotel.com.pe/wp-content/uploads/2021/01/Mesa-de-trabajo-1307-1.png'
								alt='secondary_image'
							/>
						</div>
					</div>
				</section>
				<section
					id='reservation'
					className='py-16 px-[300px]'
				>
					<div className='flex w-full justify-around'>
						<CardRoom title='Plata' />
						<CardRoom title='Diamante' />
						<CardRoom title='Oro' />
					</div>
				</section>
			</main>
			<Footer />
			<Modal
				isOpen={isOpenRegister}
				onOpenChange={onOpenChangeRegister}
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
										<AiOutlineMail className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
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

			<Modal
				isOpen={isOpenLogin}
				onOpenChange={onOpenChangeLogin}
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
										<AiOutlineMail className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Email'
									placeholder='Enter your email'
									variant='bordered'
								/>
								<Input
									endContent={
										<BiLockAlt className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
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
									onPress={onClose}
								>
									Ingresar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default HomePage
