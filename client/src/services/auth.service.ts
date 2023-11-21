import { URL_API } from '@/constants/data'

interface User {
	names: string
	email: string
	phone: string
	address: string
	dni: string
	password: string
}

export async function login_service({
	email,
	password,
}: {
	email: string
	password: string
}) {
	try {
		const response = await fetch(`${URL_API}/api/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
			credentials: 'include',
		})
		console.log(response)

		const data = await response.json()
		return {
			id: data.id as string,
			name: data.names as string,
			email: data.email as string,
			phone: data.phone as string,
			rol: (data.role as string) ?? 'client',
		}
	} catch (error) {
		console.log(error)
	}
}

export async function register_service_client(user: User) {
	const response = await fetch(`${URL_API}/api/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	})
	const data = await response.json()
	return data
}

export async function code_verify_service(code: string) {
	const email = localStorage.getItem('email_register')
	if (!email) throw new Error('No se encontro el email')
	try {
		console.log({
			code,
			email,
		})

		await fetch(`${URL_API}/api/auth/validUser`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code, email }),
			credentials: 'include',
		})
		localStorage.removeItem('email_register')
	} catch (error) {
		console.log(error)
	}
}
