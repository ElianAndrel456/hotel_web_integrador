import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import BaseLayout from '../layouts/BaseLayout'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import ReservationPage from '../pages/ReservationPage'
import { AdminLayout } from '@/layouts/AdminLayout'
import { DashboardPage } from '@/pages/admin/DashboardPage'
import { ClientPage } from '@/pages/admin/ClientPage'
import { ListOfReservationcPage } from '@/pages/admin/ListOfReservationcPage'
import { AditionalServicesPage } from '@/pages/admin/AditionalServicesPage'
import RoomsPage from '@/pages/admin/RoomsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
		children: [
			{ path: '/', element: <HomePage /> },
			{
				path: 'sobre-nosotros',
				element: <AboutPage />,
			},
			{
				path: 'contacto',
				element: <ContactPage />,
			},
			{
				path: 'reservacion',
				element: <ReservationPage />,
			},
		],
	},
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{ path: '/admin', element: <DashboardPage /> },
			{
				path: '/admin/clientes',
				element: <ClientPage />,
			},
			{
				path: '/admin/reservaciones',
				element: <ListOfReservationcPage />,
			},
			{
				path: '/admin/servicios-adicionales',
				element: <AditionalServicesPage />,
			},
			{
				path: '/admin/habitaciones',
				element: <RoomsPage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
		errorElement: <NotFoundPage />,
	},
])
