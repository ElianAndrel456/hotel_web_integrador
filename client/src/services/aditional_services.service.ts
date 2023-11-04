import { URL_API } from '@/constants/data'
import { IServices } from '@/pages/admin/AditionalServicesPage'
export type TypeServiceWithOutId = Omit<IServices, 'id'>

export const getAllServices = async () => {
	try {
		const response = await fetch(`${URL_API}/api/aditional_services`)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

export const createService = async (service: TypeServiceWithOutId) => {
	try {
		const res = await fetch(`${URL_API}/api/aditional_services/create`, {
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
		const res = await fetch(`${URL_API}/api/aditional_services/delete/${id}`, {
			method: 'DELETE',
		})
		const data = await res.json()
		return data
	} catch (error) {
		console.log(error)
		return false
	}
}

export const updateService = async (
	id: string,
	service: TypeServiceWithOutId
) => {
	try {
		const res = await fetch(`${URL_API}/api/aditional_services/update/${id}`, {
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
