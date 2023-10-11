import { useEffect, useState } from 'react'
const useScrollY = () => {
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

export default useScrollY
