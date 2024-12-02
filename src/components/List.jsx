'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import minus from '@/app/assets/minus.svg'
import refresh from '@/app/assets/refresh.svg'
import Details from '@/components/Details'

const List = ({ markets, assets, setAssets }) => {
	const [asset, setAsset] = useState(false)
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

	const detailsModalHandler = (asset) => {
		setIsDetailsModalOpen(true)
		setAsset(asset)
	}

	const refreshHandler = (asset) => {
		refreshPrice(asset.id)
	}

	const removeHandler = (asset) => {
		if (assets.length === 1) {
			setAssets([])
		} else {
			const index = assets.indexOf(assets.find((a) => a.id === asset.id))
			const updatedAssets = assets.slice()
			updatedAssets.splice(index, 1)
			setAssets(updatedAssets)

			// Save assets to localStorage
    	localStorage.setItem('assets', JSON.stringify(updatedAssets));
		}
	}

	const editBalanceHandler = (e, id) => {
		e.preventDefault()
		const newBalance = parseFloat(e.target.value)

		// Find the asset to update
    const assetIndex = assets.findIndex((asset) => asset.id === id)
    if (assetIndex !== -1 && !isNaN(newBalance)) {
    	const updatedAsset = {
    		...assets[assetIndex],
    		balance: newBalance,
    		value: assets[assetIndex].market.current_price * newBalance,
    	}

	    // Update the assets array
	    const updatedAssets = [...assets]
	    updatedAssets[assetIndex] = updatedAsset
	    setAssets(updatedAssets)

	    // Save updated assets to localStorage
    	localStorage.setItem('assets', JSON.stringify(updatedAssets));
	  }
	}

  const refreshPrice = async (id) => {

    // Asset details (API Endpoint)
    const ROOT_URL = `https://api.coingecko.com/api/v3`

    // Market data
    const market = markets.find((market) => market.id === id)
    if (!market) {
    	alert(`Market data not found for asset ID: ${id}`);
    	return;
    }

    // Prices
    const PRICES_ENDPOINT = `/coins/${id}/market_chart/`
    const PRICES_ARGUMENTS = `?vs_currency=usd&days=7&interval=daily`

    const pricesResponse = await fetch(ROOT_URL + PRICES_ENDPOINT + PRICES_ARGUMENTS)
    const prices = (await pricesResponse.json()).prices

    // Find the asset to update
    const assetIndex = assets.findIndex((asset) => asset.id === id)
    if (assetIndex !== -1) {
    	const updatedAsset = {
    		...assets[assetIndex],
    		market: market,
    		prices: prices,
    		value: market.current_price * assets[assetIndex].balance,
    	}

    // Update the assets array
    const updatedAssets = [...assets]
    updatedAssets[assetIndex] = updatedAsset
    setAssets(updatedAssets)

    // Save assets to localStorage
    localStorage.setItem('assets', JSON.stringify(updatedAssets));
    }
  }

	return (
		<div className="list bg-secondary-light col-span-full row-start-3 overflow-auto row-start-2 my-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 grid-dense place-items-end items-center pb-8 transition-all duration-250 ease-in-out">
			<div className="bg-primary-light text-light w-full h-full p-4 rounded-md relative">
			<h3>Assets List</h3>
			<br />
			<table className="border-b text-sm text-light border-collapse p-4 text-left w-full mt-1">
				<thead>
					<tr className="border-b text-light border-collapse p-4 text-left">
						<th></th>
						<th>Asset</th>
						<th>Balance</th>
						<th>Symbol</th>
						<th>Price (USD)</th>
						<th>Value (USD)</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{assets.map((asset, index) => (
					<tr key={index} className="border-b text-light border-collapse p-4 text-left">
						<td>
							<Image 
								src={asset.market.image}
								width={25}
								height={25}
								alt='Asset image'
							/>
						</td>
						<td>{asset.market.name}</td>
						<td>
							<input 
								name="editBalance"
								id="editBalance"
								type="number" 
								placeholder={asset.balance} 
								className="bg-slate-100 w-[80px]" 
								step="any"
								onChange={(e) => editBalanceHandler(e, asset.id)}
							/>
						</td>
						<td>{asset.market.symbol.toUpperCase()}</td>
						<td>{asset.market.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
						<td>{asset.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
						<td><Button onClick={() => detailsModalHandler(asset)}>Details</Button></td>
						<td>
							<button className="remove" onClick={() => refreshHandler(asset)}>
								<Image
									src={refresh}
									width={20}
									height={20}
									alt="Refresh asset"
								/>
							</button>
						</td>
						<td>
							<button className="remove" onClick={() => removeHandler(asset)}>
								<Image
									src={minus}
									width={20}
									height={20}
									alt="Remove asset"
								/>
							</button>
						</td>
					</tr>
					))}
				</tbody>
			</table>

			{isDetailsModalOpen && 
				<Details 
					setIsDetailsModalOpen={setIsDetailsModalOpen}
					asset={asset}
				/>
			}

			</div>
		</div>
	)
}

export default List;
