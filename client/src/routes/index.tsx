import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import BaseLayout from '../layouts/BaseLayout'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import ReservationPage from '../pages/ReservationPage'

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
])
