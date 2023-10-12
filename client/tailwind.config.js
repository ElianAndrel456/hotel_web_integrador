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
			colors: {
				primary: '#F0A000',
			},
			backgroundImage: {
				'hero-pattern':
					'url("https://cf.bstatic.com/xdata/images/hotel/max1024x768/117560771.jpg?k=08460aee665d84703661067072178fd7a0998e43dff6c0469e3c81159edaaaf8&o=&hp=1")',
				'large-hero-pattern':
					"url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/117560933.jpg?k=982285525e63f3c983e61a30078dec65235fa26d5905bdc2e31c2617abc3677a&o=&hp=1')",
				'large-hero-pattern2':
					"url('https://cf.bstatic.com/xdata/images/landmark/max1024/235204.webp?k=df2f6a3bd8f6e4f6814b4aa95e8ec20e51c16f471f27d287f720133c43b1d314&o=')",
			},
		},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						primary: '#F0A000',
						secondary: '#9daaf9',
					},
				},
			},
		}),
	],
}
