import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { NextUIProvider } from '@nextui-org/react'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
	return (
		<NextUIProvider>
			<RouterProvider router={router} />
		</NextUIProvider>
	)
}

export default App
