import { create } from 'zustand'
interface UIStore {
  openModalLogin: boolean
  openModalRegister: boolean
  openModalCode: boolean
  language: 'es' | 'en'

  changeModalLogin: (value: boolean) => void
  changeModalRegister: (value: boolean) => void
  changeModalCode: (value: boolean) => void
  changeLanguage: (value: 'es' | 'en') => void
}

export const useUIStore = create<UIStore>((set) => ({
  openModalLogin: false,
  openModalRegister: false,
  openModalCode: false,
  language: 'es',

  changeModalLogin: (value) => set((state) => ({ ...state, openModalLogin: value })),
  changeModalRegister: (value) => set((state) => ({ ...state, openModalRegister: value })),
  changeModalCode: (value) => set((state) => ({ ...state, openModalCode: value })),
  changeLanguage: (value) => set((state) => ({ ...state, language: value })),
}))
