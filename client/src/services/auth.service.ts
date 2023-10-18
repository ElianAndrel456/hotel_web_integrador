import { UserAccountI } from '@/components'
import { URL_API } from '@/constants/data'

export async function login_service({
	user,
	password,
}: {
	user: string
	password: string
}) {
	try {
		const response = await fetch(`${URL_API}/api/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user, password }),
			credentials: 'include',
		})
		console.log(response)

		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

export async function register_service_client(user: UserAccountI) {
	const response = await fetch(`${URL_API}/api/cliente/create`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	})
	const data = await response.json()
	return data
}
