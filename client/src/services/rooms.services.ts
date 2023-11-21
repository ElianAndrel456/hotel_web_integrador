import { URL_API } from '@/constants/data'
import { IRooms } from '@/pages/admin/RoomsPage'

type RoomWithOutId = Omit<IRooms, 'id'>

export async function getAllRooms() {
  try {
    const response = await fetch(`${URL_API}/api/rooms`)
    const data = await response.json()

    const contractRooms = data.map(
      (room: {
        id: string
        numberRoom: string
        categoryRoom: 'PLATA' | 'ORO' | 'DIAMANTE'
        typeRoom: 'INDIVIDUAL' | 'DOBLE' | 'TRIPLE' | 'SUITE'
        price: number
        state: 'DISPONIBLE' | 'RESERVADO' | 'MANTENIMIENTO'
      }) => ({
        id: room.id,
        numberRoom: room.numberRoom,
        categoryRoom: room.categoryRoom,
        typeRoom: room.typeRoom,
        price: room.price,
        state: room.state,
      })
    )

    return contractRooms
  } catch (error) {
    console.log(error)
  }
}

export async function createRoomService(room: RoomWithOutId) {
  try {
    const response = await fetch(`${URL_API}/api/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(room),
    })
    const data = await response.json()

    return {
      id: data.id,
      price: data.price,
      typeRoom: data.typeRoom,
      categoryRoom: data.categoryRoom,
      state: data.state,
      numberRoom: data.numberRoom,
    } as IRooms
  } catch (error) {
    console.log(error)
  }
}

export async function updateRoomService(room: IRooms) {
  try {
    const response = await fetch(`${URL_API}/api/rooms/${room.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(room),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteRoomService(id: IRooms['id']) {
  try {
    await fetch(`${URL_API}/api/rooms/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.log(error)
  }
}
