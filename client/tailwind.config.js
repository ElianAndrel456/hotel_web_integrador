import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'hero-pattern':
					'url("https://cf.bstatic.com/xdata/images/hotel/max1024x768/117560771.jpg?k=08460aee665d84703661067072178fd7a0998e43dff6c0469e3c81159edaaaf8&o=&hp=1")',
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui()],
}
