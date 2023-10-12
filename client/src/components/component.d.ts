export interface ICardRoomProps {
	title: string
	img_url?: string
	description?: string
	ditails_url?: string
	reservation_url?: string
	bg_color?: string
}
export interface IModalAuthProps {
	isOpen: boolean
	onOpenChange: () => void
}

export interface ILargeBannerProps {
	title: string
}
