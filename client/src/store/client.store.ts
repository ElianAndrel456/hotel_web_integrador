import { IClients } from '@/pages/admin/ClientPage'
import { create } from 'zustand'

interface ClientStore {
	clients: IClients[]

	setClients: (value: IClients[]) => void
	addClientStore: (value: IClients) => void
	updateClientStore: (value: IClients) => void
	deleteClientStore: (id: IClients['id']) => void
}

export const useClientStore = create<ClientStore>((set) => ({
	clients: [],
	setClients: (value) => set((state) => ({ ...state, clients: value })),
	addClientStore: (value) =>
		set((state) => ({ ...state, clients: [...state.clients, value] })),
	updateClientStore: (value) =>
		set((state) => ({
			...state,
			clients: state.clients.map((client) =>
				client.id === value.id ? value : client
			),
		})),
	deleteClientStore: (id) =>
		set((state) => ({
			...state,
			clients: state.clients.filter((client) => client.id !== id),
		})),
}))
