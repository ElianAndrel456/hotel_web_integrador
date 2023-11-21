import { URL_API } from '@/constants/data'
import { IServices } from '@/pages/admin/AditionalServicesPage'
export type TypeServiceWithOutId = Omit<IServices, 'id'>

export const getAllServices = async () => {
  try {
    const response = await fetch(`${URL_API}/api/additionals`)
    const data = await response.json()
    const contractServices = data.map(
      (item: { id: string; name: string; description: string; price: number; available: boolean }) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        available: item.available,
      })
    )

    return contractServices
  } catch (error) {
    console.log(error)
  }
}

export const createService = async (service: TypeServiceWithOutId) => {
  try {
    const res = await fetch(`${URL_API}/api/additionals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(service),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    return false
  }
}

export const deleteService = async (id: string) => {
  try {
    const res = await fetch(`${URL_API}/api/additionals/${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    return false
  }
}

export const updateService = async (service: IServices) => {
  try {
    const res = await fetch(`${URL_API}/api/additionals/${service.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(service),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    return false
  }
}
