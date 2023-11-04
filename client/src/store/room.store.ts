import { IRooms } from '@/pages/admin/RoomsPage'
import { create } from 'zustand'

interface RoomStore {
	rooms: IRooms[]
	setRoomsStore: (rooms: RoomStore['rooms']) => void
	deleteRoomStore: (id: IRooms['id']) => void
	updateRoomStore: (room: IRooms) => void
	createRoomStore: (room: IRooms) => void
}

export const useRoomStore = create<RoomStore>((set) => ({
	rooms: [],
	setRoomsStore: (rooms) => set({ rooms }),
	deleteRoomStore: (id) =>
		set((state) => ({
			rooms: state.rooms.filter((room) => room.id !== id),
		})),
	updateRoomStore: (room) =>
		set((state) => ({
			rooms: state.rooms.map((roomState) =>
				roomState.id === room.id ? room : roomState
			),
		})),
	createRoomStore: (room) =>
		set((state) => ({
			rooms: [...state.rooms, room],
		})),
}))
