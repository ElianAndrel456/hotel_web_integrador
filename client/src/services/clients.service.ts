import { UserAccountI } from '@/components'
import { URL_API } from '@/constants/data'
import { IClients } from '@/pages/admin/ClientPage'

export async function getAllClientes() {
	const response = await fetch(`${URL_API}/api/cliente`)
	const data = await response.json()
	return data
}

export async function getCliente(id: string) {
	const response = await fetch(`${URL_API}/api/cliente/${id}`)
	const data = await response.json()
	return data
}

export async function createClienteService(client: UserAccountI) {
	const response = await fetch(`${URL_API}/api/cliente/create`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(client),
	})
	const data = await response.json()
	return data
}

export async function deleteClienteService(id: string) {
	const response = await fetch(`${URL_API}/api/cliente/${id}`, {
		method: 'DELETE',
	})
	const data = await response.json()
	return data
}

export async function updateClienteService(client: IClients) {
	const response = await fetch(`${URL_API}/api/cliente/${client.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(client),
	})
	const data = await response.json()
	return data
}
