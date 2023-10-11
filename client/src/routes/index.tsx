import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import BaseLayout from '../layouts/BaseLayout'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
		children: [{ path: '/', element: <HomePage /> }],
	},
])
