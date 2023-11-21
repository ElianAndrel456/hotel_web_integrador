import { create } from 'zustand'
interface UIStore {
  openModalLogin: boolean
  openModalRegister: boolean
  openModalCode: boolean
  language: 'es' | 'en'

  changeModalLogin: (value: boolean) => void
  changeModalRegister: (value: boolean) => void
  changeModalCode: (value: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  openModalLogin: false,
  openModalRegister: false,
  openModalCode: false,
  language: 'en',

  changeModalLogin: (value) => set((state) => ({ ...state, openModalLogin: value })),
  changeModalRegister: (value) => set((state) => ({ ...state, openModalRegister: value })),
  changeModalCode: (value) => set((state) => ({ ...state, openModalCode: value })),
}))
