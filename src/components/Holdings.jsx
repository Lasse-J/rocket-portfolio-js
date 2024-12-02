'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Holdings = ({ assets }) => {
	const defaultSymbols = ["--", "--", "--", "--", "--"]
	const defaultValues = [1, 2, 3, 4, 5]

	const [symbols, setSymbols] = useState(null)
	const [values, setValues] = useState(null)

	const calculateValue = () => {
		const syms = []
		const vals = []

		for (let i = 0; i < assets.length; i++) {
			syms.push(assets[i].market.symbol.toUpperCase())
			vals.push(assets[i].value)
		}

		setSymbols(syms)
		setValues(vals)
	}

	useEffect(() => {
		if (assets.length === 0) {
			setSymbols(null)
		} else {
			calculateValue()
		}
	}, [assets])

	return (
		<div className="holdings bg-secondary-light w-[50%] h-[fit] my-4 gap-4 pb-1 transition-all duration-250 ease-in-out">
			<div className="bg-primary-light text-light h-full p-4 rounded-md relative">
				<h3 className="holdings__title">Holdings</h3>

				<div className="holdings__chart place-items-center">

					<Chart
						options={{
							labels: symbols ? symbols : defaultSymbols,
							legend: {
								position: 'bottom',
								horizontalAlign: 'center',
								labels: {
									colors: '#000000'
								}
							}
						}}
						series={values ? values : defaultValues}
						type="pie"
						height={300}
					/>

				</div>
			</div>
		</div>
	)
}

export default Holdings;