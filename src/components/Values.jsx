'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Values = ({ assets }) => {
	const defaultDates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
	const defaultValues = [30, 40, 45, 50, 48, 60, 70, 91]
	const [dates, setDates] = useState(null)
	const [values, setValues] = useState(null)

	const calculate7DayValue = () => {
		const totalValues = [0, 0, 0, 0, 0, 0, 0, 0]

		for (let i = 0; i < assets.length; i++) {
			for (let j = 0; j < assets[i].prices.length; j++) {
				totalValues[j] += assets[i].balance * assets[i].prices[j][1]
				totalValues[j] = Number(totalValues[j].toFixed(2))
			}
		}

		const dates = Object.values(assets[0].prices).flatMap(price => price[0])

		for (let i = 0; i < dates.length; i++) {
			dates[i] = new Date(dates[i]).toLocaleDateString(undefined, { 
				weekday: 'short', month: 'short', day: 'numeric' 
			})
		}

		setDates(dates)
		setValues(totalValues)
	}

//	TODO: const calculate24HourValue = () => {}
//	TODO: const calculate1MonthValue = () => {}
//	TODO: const calculateYearToDateValue = () => {}

	useEffect(() => {
		if (assets.length === 0) {
			setDates(null)
			setValues(null)
		} else {
			calculate7DayValue()
		}
	}, [assets])

	return (
		<div className="values bg-secondary-light w-[50%] h-[fit] my-4 gap-4 pb-1 transition-all duration-250 ease-in-out">
			<div className="bg-primary-light text-light p-4 w-full h-full rounded-md relative">
				<h3 className="values__title">Portfolio Value</h3>
				<div className="values__chart">

					<Chart
						options={{
							colors: ['#2F4858'],
							stroke: {
								curve: 'smooth',
								colors: ['#488451'],
							},
							grid: {
								show: false
							},
							xaxis: {
								categories: dates ? dates : defaultDates,
								labels: {
									show: true,
									rotateAlways: true,
									rotate: -45,
									offsetY: 10,
									style: {
										colors: '#000000',
									}
								},
							},
							yaxis: {
								labels: {
									show: true,
									offsetX: -10,
									style: {
										colors: '#000000',
									}
								},
							},
							tooltip: {
								enabled: true,
								theme: 'dark',
								style: {
									fontSize: '12px',
									background: '#FFFFFF'
								},
							},
							markers: {
								size: 0,
								colors: ['#2F4858'],
								strokeColors: '#fff',
								strokeWidth: 2,
								hover: {
									size: 8,
								},
							},
						}}
						series={[
							{
								name: 'Price',
								data: values ? values : defaultValues
							}
						]}
						type='line'
						height='300'
					/>

				</div>
			</div>
		</div>
	)
}

export default Values;
