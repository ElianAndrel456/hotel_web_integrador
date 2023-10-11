import {
	BsFillArrowDownCircleFill,
	BsFacebook,
	BsInstagram,
} from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { BiLockAlt } from 'react-icons/bi'
import {
	AiOutlineMail,
	AiOutlinePhone,
	AiOutlineGooglePlus,
} from 'react-icons/ai'
import {
	Modal,
	useDisclosure,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalContent,
	Checkbox,
	Input,
	Link,
	Button,
	Divider,
} from '@nextui-org/react'

const HomePage = () => {
	const {
		isOpen: isOpenLogin,
		onOpen: onOpenLogin,
		onOpenChange: onOpenChangeLogin,
	} = useDisclosure()

	const {
		isOpen: isOpenRegister,
		onOpen: onOpenRegister,
		onOpenChange: onOpenChangeRegister,
	} = useDisclosure()

	return (
		<>
			<main>
				<header className='text-white bg-hero-pattern bg-[rgba(0,0,0,0.5)] bg-blend-darken bg-no-repeat bg-cover bg-fixed min-h-screen w-full gap-4 flex relative justify-center items-center flex-col'>
					<nav className='absolute top-5 right-5'>
						<ul className='flex gap-4'>
							<li
								className='cursor-pointer'
								onClick={onOpenRegister}
							>
								Registrarse
							</li>
							<Divider
								orientation='vertical'
								className='bg-white h-6'
							/>
							<li
								onClick={onOpenLogin}
								className='cursor-pointer'
							>
								Iniciar Sesion
							</li>
						</ul>
					</nav>
					<h1 className='text-5xl font-bold '>
						<span>Hotel </span>
						Waynapicchu
					</h1>
					<p className='text-lg font-semibold'>
						Welcome to the Hotel Waynapicchu, the best hotel in the world!
					</p>
					<a
						href='#reservation'
						className='absolute bottom-5'
					>
						<BsFillArrowDownCircleFill className='text-4xl animate-bounce' />
					</a>
				</header>
				<section
					id='reservation'
					className='py-16'
				>
					<div className='flex w-full justify-around'>
						<div className='border rounded-md py-2 px-6'>
							<div>
								<h3 className='text-center text-xl'>Categoria</h3>
								<h4 className='text-center text-2xl'>Diamante</h4>
							</div>
							<div>
								<img
									src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/85796311.jpg?k=76f41f9cd013f4b37648b89ac9be1b721fd1228890633e964d317060fe338c1c&o=&hp=1'
									alt=''
									className='w-full h-[200px] object-cover object-center'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<button className='border py-2'>Ver detalle</button>
								<button className='border py-2'>Reservar</button>
							</div>
						</div>
					</div>
				</section>
				<footer className='bg-black flex flex-col gap-10 text-white pt-12 pb-8 px-20'>
					<div className='grid grid-cols-3 justify-items-center '>
						<div className='flex flex-col gap-2'>
							<h6 className='text-sm font-bold'>DIRECCION:</h6>
							<div>
								<CiLocationOn className='inline-block mr-2 text-lime-400' />
								<span className='text-sm font-thin'>
									Av. Garcilaso 216-A - Wanchaq / Cusco
								</span>
							</div>
							<div>
								<AiOutlinePhone className='inline-block mr-2 text-lime-400' />
								<span className='text-sm font-thin'>+51 944268176</span>
							</div>
							<div>
								<AiOutlineMail className='inline-block mr-2 text-lime-400' />
								<span className='text-sm font-thin'>
									reservas@waynapicchu.com.pe
								</span>
							</div>
						</div>
						<div className='flex flex-col gap-2'>
							<h6 className='text-sm font-bold'>REDES SOCIALES:</h6>
							<a href='#'>
								<BsFacebook className='inline-block mr-2' />
								<span className='text-sm font-thin'>Waynapicchu hotal</span>
							</a>
							<a href='#'>
								<BsInstagram className='inline-block mr-2' />
								<span className='text-sm font-thin'>Waynapicchu hotal</span>
							</a>
							<a href='$'>
								<AiOutlineGooglePlus className='inline-block mr-2' />
								<span className='text-sm font-thin'>Waynapicchu hotal</span>
							</a>
						</div>
						<div className=''>
							<a href='#'>
								<img
									src='/logo.png'
									alt='logo waynapicchu hotel'
									className='w-[350px] '
								/>
							</a>
						</div>
					</div>
					<div className='flex justify-end gap-6'>
						<p className='text-sm font-thin'>Waynapicchu Hotel Cusco</p>
						<p className='text-sm font-thin'>2023 Copyright</p>
					</div>
				</footer>
			</main>
			{/* MODAL REGISTER USUARIO */}
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
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='flat'
									onPress={onClose}
								>
									Close
								</Button>
								<Button
									color='primary'
									onPress={onClose}
								>
									Sign in
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			{/* MODAL LOGIN */}
			<Modal
				isOpen={isOpenLogin}
				onOpenChange={onOpenChangeLogin}
				placement='top-center'
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
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
										Remember me
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
									Close
								</Button>
								<Button
									color='primary'
									onPress={onClose}
								>
									Sign in
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