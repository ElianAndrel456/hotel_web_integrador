import { IReservation } from '@/pages/admin/ListOfReservationcPage'
import { create } from 'zustand'

interface ReservationStore {
	reservations: IReservation[]
	setReservationStore: (reservation: ReservationStore['reservations']) => void
	deleteReservationStore: (id: IReservation['id']) => void
	updateReservationStore: (reservation: IReservation) => void
	createReservationStore: (reservation: IReservation) => void
}

export const useReservationStore = create<ReservationStore>((set) => ({
	reservations: [],
	setReservationStore: (reservations) => set({ reservations }),
	deleteReservationStore: (id) =>
		set((state) => ({
			reservations: state.reservations.filter((room) => room.id !== id),
		})),
	updateReservationStore: (room) =>
		set((state) => ({
			reservations: state.reservations.map((roomState) =>
				roomState.id === room.id ? room : roomState
			),
		})),
	createReservationStore: (reservation) =>
		set((state) => ({
			reservations: [...state.reservations, reservation],
		})),
}))
