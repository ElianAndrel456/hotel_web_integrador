import { URL_API } from '@/constants/data'
import { IReservation } from '@/pages/admin/ListOfReservationcPage'

type IReservationWithOutId = Omit<IReservation, 'id'>

export const getAllReservations = async () => {
	try {
		const res = await fetch(`${URL_API}/api/reservacion`)
		const data = await res.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

export const createReservation = async (reservation: IReservationWithOutId) => {
	try {
		const nowDate = new Date()
		const response = await fetch(`${URL_API}/api/reservacion/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				dateIn: reservation.dateIn,
				dateOut: reservation.dateOut,
				numberPeople: reservation.numberPeople,
				reservationState: reservation.reservationState,
				total: reservation.total,
				room: { id: reservation.room },
				client: { id: reservation.client },
				manager: { id: reservation.manager },
				aditionalServices: reservation.aditionalServices.map((s) => ({
					id: s,
				})),
				reservationDate: nowDate,
			}),
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

export const deleteResevation = async (id: string) => {
	try {
		await fetch(`${URL_API}/api/reservacion/${id}`, {
			method: 'DELETE',
		})
	} catch (error) {
		console.log(error)
	}
}
