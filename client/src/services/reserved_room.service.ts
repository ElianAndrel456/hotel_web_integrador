import { URL_API } from '@/constants/data'
import { IReservation } from '@/pages/admin/ListOfReservationcPage'

type IReservationWithOutId = Omit<IReservation, 'id'>

export const getAllReservations = async () => {
  try {
    const res = await fetch(`${URL_API}/api/reserveds`)
    const data = await res.json()
    const contractReservation = data.map(
      (item: {
        id: string
        dateReserved: string
        dateEntry: string
        dateDeparture: string
        state: 'PENDIENTE' | 'CANCELADA' | 'FINALIZADA'
        total: number
        client: {
          id: string
        }
        room: {
          id: string
        }
        services: {
          id: string
        }[]
      }) => ({
        id: item.id,
        dateReserved: item.dateReserved,
        dateEntry: item.dateEntry,
        dateDeparture: item.dateDeparture,
        state: item.state,
        total: item.total,
        room: item.room && {
          id: item.room.id,
        },
        client: item.client && {
          id: item.client.id,
        },
        services: item.services && item.services.map((s) => s.id),
      })
    )

    return contractReservation
  } catch (error) {
    console.log(error)
  }
}

export const createReservation = async (reservation: IReservationWithOutId) => {
  try {
    const nowDate = new Date()
    const response = await fetch(`${URL_API}/api/reserveds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateEntry: reservation.dateEntry,
        dateDeparture: reservation.dateDeparture,
        state: reservation.state,
        room: { id: reservation.room },
        client: { id: reservation.client },
        services:
          reservation.services &&
          reservation.services.map((s) => ({
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

export const updateReservation = async (reservation: IReservation) => {
  try {
    const res = await fetch(`${URL_API}/api/reserveds/${reservation.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteResevation = async (id: string) => {
  try {
    await fetch(`${URL_API}/api/reserveds/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.log(error)
  }
}
