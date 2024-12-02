'use client'

import { useState, useEffect } from 'react'
import { HomeIcon, ChartCandlestick, BriefcaseBusiness } from 'lucide-react'
import Link from 'next/link'

import NavButton from '@/components/NavButton'
import { ModeToggle } from '@/components/ModeToggle'
import { CurrencyToggle } from '@/components/CurrencyToggle'

const Navbar = () => {
	const [btcMarkets, setBtcMarkets] = useState([])
	const [ethMarkets, setEthMarkets] = useState([])
	const [bitcoinPrice, setBitcoinPrice] = useState(0)
	const [ethereumPrice, setEthereumPrice] = useState(0)

  const getBtcMarkets = async () => {
    const ROOT_URL = `https://api.coingecko.com/api/v3`
    const ENDPOINT = `/coins/markets`
    const ARGUMENTS = `?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=1&page=1&sparkline=false&locale=en`

    try {
	    const response = await fetch(ROOT_URL + ENDPOINT + ARGUMENTS)
	    const data = await response.json()
	    setBtcMarkets(data)
    } catch (error) {
    	console.log('Failed to fetch (BTC) markets:', error)
    }
  }

   const getEthMarkets = async () => {
    const ROOT_URL = `https://api.coingecko.com/api/v3`
    const ENDPOINT = `/coins/markets`
    const ARGUMENTS = `?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=1&page=1&sparkline=false&locale=en`

    try {
	    const response = await fetch(ROOT_URL + ENDPOINT + ARGUMENTS)
	    const data = await response.json()
	    setEthMarkets(data)
    } catch (error) {
    	console.log('Failed to fetch (ETH) markets:', error)
    }
  }

  const getBitcoinPrice = async () => {
  	if (btcMarkets && btcMarkets.length > 0) {
  		setBitcoinPrice(btcMarkets[0].current_price)
  	}
  }

  const getEthereumPrice = async () => {
  	if (ethMarkets && ethMarkets.length > 0) {
  		setEthereumPrice(ethMarkets[0].current_price)
  	}
  }

  useEffect(() => {
  	if (btcMarkets.length === 0) {
  		getBtcMarkets()
  	}
  	if (ethMarkets.length === 0) {
  		getEthMarkets()
  	}
  }, [])


  useEffect(() => {
  	if (btcMarkets) {
  		getBitcoinPrice()
  	}
  }, [btcMarkets])

  useEffect(() => {
  	if (ethMarkets) {
  		getEthereumPrice()
  	}
  }, [ethMarkets])


	return (
	 	<header className="animate-slide h-12 p-2 sticky top-0 z-20">
	 		<div className="flex h-8 items-center justify-between w-full">
	 			<div className="flex items-center gap-2">
	 				<NavButton href="/" label="Home" icon={HomeIcon} />
	 					<Link href="/" className="flex justify-center items-center gap-2 ml-0 mt-1" title="Home">
	 					</Link>
					<h1 className="">
						Rocket Portfolio
					</h1>
	 			</div>

	 			<div className="flex items-center">
	 				BTC: ${bitcoinPrice} |
					ETH: ${ethereumPrice}
	 				<nav>
	 					<CurrencyToggle />

		 				<NavButton href="/#charts" label="Charts" icon={ChartCandlestick} />

		 				<NavButton href="/#portfolio" label="Portfolio" icon={BriefcaseBusiness} />

		 				<ModeToggle />
	 				</nav>
		 		</div>
	 		</div>
	 	</header>
	)
}

export default Navbar;
