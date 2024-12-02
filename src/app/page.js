'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

// Components
import Overview from '@/components/Overview';
import Holdings from '@/components/Holdings';
import Values from '@/components/Values';
import List from '@/components/List';

// Snapshot Data
// import marketSnapshot from '@/app/snapshots/markets.json'
// import tokensSnapshot from '@/app/snapshots/tokens.json'
// import pricesSnapshot from '@/app/snapshots/prices.json'

export default function Home() {
  const [trackedAssets, setTrackedAssets] = useState([]);
  const [markets, setMarkets] = useState(null);
  const [assets, setAssets] = useState([]);

  // Makes API call to fetch market data
  const getMarkets = async () => {
    const ROOT_URL = `https://api.coingecko.com/api/v3`
    const ENDPOINT = `/coins/markets`
    const AMOUNT = 250
    const ARGUMENTS = `?vs_currency=usd&order=market_cap_desc&per_page=${AMOUNT}&page=1&sparkline=false&locale=en`

    const response = await fetch(ROOT_URL + ENDPOINT + ARGUMENTS)

    setMarkets(await response.json())
  }

  const getAsset = async () => {
    // Fetch id
    const id = trackedAssets[trackedAssets.length - 1]

    // Market data
    const market = markets?.find((market) => market.id === id.asset)

    if (!market) {
      console.error(`Market data not found for asset ID: ${id}`)
      return
    }

    // Asset details (API Endpoint)
    const ROOT_URL = `https://api.coingecko.com/api/v3`
//    const ASSET_ENDPOINT = `/coins/${id.asset}`
//    const ASSET_ARGUMENTS = `?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`

//    const assetResponse = await fetch(ROOT_URL + ASSET_ENDPOINT + ASSET_ARGUMENTS)
//    const tokensSnapshot = await assetResponse.json()

    // Prices
    const PRICES_ENDPOINT = `/coins/${id.asset}/market_chart/`
    const PRICES_ARGUMENTS = `?vs_currency=usd&days=7&interval=daily`

    const pricesResponse = await fetch(ROOT_URL + PRICES_ENDPOINT + PRICES_ARGUMENTS)
    const prices = (await pricesResponse.json()).prices

    // Balance
    const balance = id.balance

    // Asset object
    const asset = {
      id: id.asset,
      market: market,
      prices: prices,
      balance: id.balance,
      value: market.current_price * balance
    }
    
    const updatedAssets = [...assets, asset];
    setAssets([...assets, asset])

    if (typeof window !== "undefined") {
      // Save assets to localStorage
      localStorage.setItem('assets', JSON.stringify(updatedAssets));
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load assets from localStorage on app load
      const storedAssets = localStorage.getItem('assets')
      if (storedAssets) {
        setAssets(JSON.parse(storedAssets))
      }
    }

    // Fetch markets if not already loaded
    if (!markets) {
      getMarkets()
    }
  }, [])

  useEffect(() => {
    if(markets && trackedAssets.length !== 0) {
      getAsset()
    }
  }, [trackedAssets])

  return (
    <div className="bg-gradient-to-t from-white via-slate-300 to-white dark:bg-gradient-to-t dark:from-black dark:via-slate-800 dark:to-black">
      <main className="flex flex-col justify-center text-center text-black max-w-7xl mx-auto h-full scrollbar-hide">
        <div className="flex flex-col gap-2 px-12 py-6 rounded-xl bg-secondary-light w-4/5 mt-2 mx-auto sm:text-2xl scrollbar-hide">
          <h2 className="text-white">Portfolio Overview</h2>

          <Overview 
            markets={markets}
            trackedAssets={trackedAssets}
            setTrackedAssets={setTrackedAssets}
            assets={assets}
            setAssets={setAssets}
          />
          <section id="charts" />

          <div className="flex flex-row justify-center gap-6">
            <Holdings
              assets={assets}
            />

            <Values 
              assets={assets}
            />
          </div>

          <section id="portfolio" />
            <List 
              markets={markets}
              assets={assets}
              setAssets={setAssets}
            />
        </div>
        <div className="details">
          <div className="divider absolute top-[100px] -left-1/2 -z-50 w-[150%] h-[60px] bg-blue-500">
          </div>
        </div>
      </main>
    </div>
  );
}
