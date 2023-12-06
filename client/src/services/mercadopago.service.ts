import { URL_API } from '@/constants/data'
import { IClients } from '@/pages/admin/ClientPage'
import { IRooms } from '@/pages/admin/RoomsPage'

export const payToMercadoPago = async (data: {
  dateEntry: string
  dateDeparture: string
  client: {
    id: IClients['id']
  }
  room: {
    id: IRooms['id']
  }
  services?: { id: string }[]
}) => {
  const res = await fetch(URL_API + '/api/mercadopago', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
    }),
  })

  const dataResponse = await res.json()

  const { initPoint } = dataResponse
  return initPoint
}
