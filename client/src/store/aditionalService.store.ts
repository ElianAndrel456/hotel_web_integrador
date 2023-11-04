import { IServices } from '@/pages/admin/AditionalServicesPage'
import { create } from 'zustand'

interface ServiceStore {
	services: IServices[]
	setServicesStore: (services: ServiceStore['services']) => void
	addServiceStore: (service: IServices) => void
	deleteServiceStore: (id: IServices['id']) => void
	updateServiceStore: (id: IServices['id'], service: IServices) => void
}

export const useServiceStore = create<ServiceStore>((set) => ({
	services: [],
	setServicesStore: (services) => set({ services }),
	addServiceStore: (service) =>
		set((state) => ({ services: [...state.services, service] })),
	deleteServiceStore: (id) =>
		set((state) => ({
			services: state.services.filter((service) => service.id !== id),
		})),
	updateServiceStore: (id, service) =>
		set((state) => ({
			services: state.services.map((s) => (s.id === id ? service : s)),
		})),
}))
