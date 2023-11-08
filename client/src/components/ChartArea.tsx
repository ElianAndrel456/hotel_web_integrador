import { createChart, ColorType } from 'lightweight-charts'
import { useEffect, useRef } from 'react'

interface ChartProps {
	data: {
		time: string
		value: number
	}[]
	colors?: {
		backgroundColor?: string
		lineColor?: string
		textColor?: string
		areaTopColor?: string
		areaBottomColor?: string
	}
}

export const ChartComponent = (props: ChartProps) => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#F0A000',
			textColor = 'black',
			areaTopColor = '#F0A000',
			areaBottomColor = 'rgba(201, 98, 0, 0.28)',
		} = {},
	} = props

	const chartContainerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleResize = () => {
			chart.applyOptions({ width: chartContainerRef!.current!.clientWidth })
		}

		const chart = createChart(chartContainerRef!.current!, {
			layout: {
				background: { type: ColorType.Solid, color: backgroundColor },
				textColor,
			},
			width: chartContainerRef!.current!.clientWidth,
			height: 300,
		})
		chart.timeScale().fitContent()

		const newSeries = chart.addAreaSeries({
			title: 'Reservas',
			lineColor,
			topColor: areaTopColor,
			bottomColor: areaBottomColor,
		})
		newSeries.setData(data)

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)

			chart.remove()
		}
	}, [
		data,
		backgroundColor,
		lineColor,
		textColor,
		areaTopColor,
		areaBottomColor,
	])

	return <div ref={chartContainerRef} />
}
