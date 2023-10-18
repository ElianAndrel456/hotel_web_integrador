import {
	Card,
	Button,
	CardBody,
	CardFooter,
	CardHeader,
	Image,
	Spacer,
} from '@nextui-org/react'
import { ICardRoomProps } from './component'
import { useUIStore } from '@/store/ui.store'
import { useAuthStore } from '@/store/auth.store'

export const CardRoom = ({
	title,
	ditails_url,
	img_url,
	reservation_url,
	bg_color,
	children,
}: ICardRoomProps) => {
	const { isAuth } = useAuthStore()
	const { changeModalLogin } = useUIStore()

	return (
		<Card
			className={`${
				bg_color
					? 'max-w-[340px] hover:scale-105 ' + bg_color
					: 'max-w-[340px] hover:scale-105'
			}
				h-full
			`}
		>
			<CardHeader>
				<h4 className='text-center text-2xl block font-semibold'>{title}</h4>
			</CardHeader>
			<CardBody>
				{img_url && (
					<Image
						src={img_url}
						alt={title + '_image'}
						className='w-full h-[200px] object-cover object-center'
					/>
				)}
				<Spacer y={2} />
				{children}
			</CardBody>
			<CardFooter className='flex justify-end gap-4'>
				{reservation_url && (
					<Button
						color='primary'
						variant='flat'
						onClick={() => {
							if (!isAuth) changeModalLogin(true)
						}}
					>
						Reservar
					</Button>
				)}
				{ditails_url && (
					<Button
						color='secondary'
						variant='bordered'
					>
						Ver detalle
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}
