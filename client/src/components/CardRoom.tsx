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

export const CardRoom = ({
	title,
	description,
	ditails_url,
	img_url,
	reservation_url,
	bg_color,
}: ICardRoomProps) => {
	return (
		<Card
			className={`${
				bg_color
					? 'max-w-[340px] hover:scale-105 ' + bg_color
					: 'max-w-[340px] hover:scale-105'
			}`}
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
				<p>{description}</p>
			</CardBody>
			<CardFooter className='flex justify-end gap-4'>
				{reservation_url && (
					<Button
						color='primary'
						variant='flat'
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
