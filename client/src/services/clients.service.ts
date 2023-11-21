import { URL_API } from '@/constants/data'
import { IClients } from '@/pages/admin/ClientPage'

export async function getAllClientes() {
	const response = await fetch(`${URL_API}/api/clients`)
	const data = await response.json()

	const dataContractClients = data.map(
		(client: {
			id: string
			names: string
			email: string
			phone: string
			role?: string
			dni: string
			address: string
		}) => ({
			id: client.id,
			names: client.names,
			email: client.email,
			phone: client.phone,
			rol: client.role ?? 'client',
			dni: client.dni,
			address: client.address,
		})
	)

	return dataContractClients
}

export async function getCliente(id: string) {
	const response = await fetch(`${URL_API}/api/clients/${id}`)
	const data = await response.json()
	return data
}

export async function createClienteService(client: IClients) {
	const response = await fetch(`${URL_API}/api/clients`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(client),
	})
	const data = await response.json()
	return data
}

export async function deleteClienteService(id: string) {
	const response = await fetch(`${URL_API}/api/clients/${id}`, {
		method: 'DELETE',
	})
	const data = await response.json()
	return data
}

export async function updateClienteService(client: IClients) {
	const response = await fetch(`${URL_API}/api/clients/${client.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(client),
	})
	const data = await response.json()
	return data
}
