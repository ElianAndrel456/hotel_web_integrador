import { URL_API } from '@/constants/data'
import { IRooms } from '@/pages/admin/RoomsPage'

type RoomWithOutId = Omit<IRooms, 'id'>

export async function getAllRooms() {
	try {
		const response = await fetch(`${URL_API}/api/habitacion`)
		const data = await response.json()

		return data
	} catch (error) {
		console.log(error)
	}
}

export async function createRoomService(room: RoomWithOutId) {
	try {
		const response = await fetch(`${URL_API}/api/habitacion/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				floor: room.floor,
				categoryRoom: room.category,
				state: room.status,
				roomNumber: room.roomNumber,
			}),
		})
		const data = await response.json()

		return {
			id: data.id,
			floor: data.floor,
			category: data.categoryRoom,
			status: data.state,
			roomNumber: data.roomNumber,
		}
	} catch (error) {
		console.log(error)
	}
}

export async function updateRoomService(room: IRooms) {
	try {
		const response = await fetch(
			`${URL_API}/api/habitacion/update/${room.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					floor: room.floor,
					categoryRoom: room.category,
					state: room.status,
					roomNumber: room.roomNumber,
				}),
			}
		)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

export async function deleteRoomService(id: IRooms['id']) {
	try {
		await fetch(`${URL_API}/api/habitacion/delete/${id}`, {
			method: 'DELETE',
		})
	} catch (error) {
		console.log(error)
	}
}
