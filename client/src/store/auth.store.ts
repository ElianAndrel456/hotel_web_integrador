import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
	user: {
		id: string
		name: string
		email: string
		phone: string
		rol?: string
	}
	isAuth: boolean

	setUser: (user: AuthStore['user']) => void
	changeIsAuth: (isAuth: AuthStore['isAuth']) => void
}
export const initial_user = {
	id: '',
	name: '',
	email: '',
	phone: '',
	rol: '',
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			user: initial_user,
			isAuth: false,

			setUser: (user) => set({ user }),
			changeIsAuth: (isAuth) => set({ isAuth }),
		}),
		{
			name: 'auth-storage',
			getStorage: () => sessionStorage,
		}
	)
)
