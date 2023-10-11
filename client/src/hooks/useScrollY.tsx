import { useEffect, useState } from 'react'
export const useScrollY = () => {
	const [scroll, setScroll] = useState(0)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY)
		})
		return () => {
			window.removeEventListener('scroll', () => {})
		}
	}, [scroll])
	return {
		scroll,
	}
}
