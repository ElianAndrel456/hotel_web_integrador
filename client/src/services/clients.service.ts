import { URL_API } from '@/constants/data'

export async function getAllClientes() {
	const response = await fetch(`${URL_API}/api/cliente`)
	const data = await response.json()
	return data
}

export async function getCliente(id: number) {
	const response = await fetch(`${URL_API}/api/cliente/${id}`)
	const data = await response.json()
	return data
}

export async function createCliente(cliente: string) {
	const response = await fetch(`${URL_API}/api/cliente`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(cliente),
	})
	const data = await response.json()
	return data
}
