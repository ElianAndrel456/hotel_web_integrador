import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { NextUIProvider } from '@nextui-org/react'

const App = () => {
	return (
		<NextUIProvider>
			<RouterProvider router={router} />
		</NextUIProvider>
	)
}

export default App
