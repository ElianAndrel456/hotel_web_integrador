import { create } from 'zustand'
interface UIStore {
	openModalLogin: boolean
	openModalRegister: boolean

	changeModalLogin: (value: boolean) => void
	changeModalRegister: (value: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
	openModalLogin: false,
	openModalRegister: false,

	changeModalLogin: (value) =>
		set((state) => ({ ...state, openModalLogin: value })),
	changeModalRegister: (value) =>
		set((state) => ({ ...state, openModalRegister: value })),
}))
