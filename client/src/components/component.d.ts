export interface ICardRoomProps {
  title: string
  img_url?: string
  openModalDitails?: () => void
  reservation_url?: string
  children?: React.ReactNode
}
export interface IModalAuthProps {
  isOpen: boolean
  onOpenChange: () => void
}

export interface ILargeBannerProps {
  title: string
}
