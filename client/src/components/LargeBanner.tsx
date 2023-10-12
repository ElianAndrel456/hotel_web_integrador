import { ILargeBannerProps } from './component'

export const LargeBanner = ({ title }: ILargeBannerProps) => {
	return (
		<header className='text-white flex items-center tracking-widest justify-center bg-large-hero-pattern bg-[rgba(0,0,0,.8)] bg-blend-darken h-[300px]'>
			<h2 className='text-6xl font-semibold'>{title}</h2>
		</header>
	)
}
