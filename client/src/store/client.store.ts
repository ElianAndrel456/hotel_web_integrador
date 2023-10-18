import { IClients } from '@/pages/admin/ClientPage'
import { create } from 'zustand'

interface ClientStore {
	clients: IClients[]

	setClients: (value: IClients[]) => void
}

export const useClientStore = create<ClientStore>((set) => ({
	clients: [],
	setClients: (value) => set((state) => ({ ...state, clients: value })),
}))
