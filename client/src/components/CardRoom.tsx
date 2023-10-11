import {
	Card,
	Button,
	CardBody,
	CardFooter,
	CardHeader,
} from '@nextui-org/react'
import { ICardRoomProps } from './component'

export const CardRoom = ({
	title,
	description,
	ditails_url,
	img_url,
	reservation_url,
}: ICardRoomProps) => {
	return (
		<Card className='max-w-xs'>
			<CardHeader>
				<h4 className='text-center text-2xl block'>{title}</h4>
			</CardHeader>
			<CardBody>
				{img_url && (
					<img
						src={img_url}
						alt={title + '_image'}
						className='w-full h-[200px] object-cover object-center'
					/>
				)}
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
				{ditails_url && <Button color='secondary'>Ver detalle</Button>}
			</CardFooter>
		</Card>
	)
}
