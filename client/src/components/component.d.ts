export interface ICardRoomProps {
	title: string
	img_url?: string
	ditails_url?: string
	reservation_url?: string
	bg_color?: string
	children?: React.ReactNode
}
export interface IModalAuthProps {
	isOpen: boolean
	onOpenChange: () => void
}

export interface ILargeBannerProps {
	title: string
}
