'use client'

import Image from 'next/image'
import close from '@/app/assets/close.svg'
import up from '@/app/assets/up-white.svg'
import down from '@/app/assets/down-white.svg'

const Details = ({ setIsDetailsModalOpen, asset }) => {
	const closeHandler = () => {
		setIsDetailsModalOpen(false)
	}

return (
  <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50">
    <div className="relative bg-secondary-dark text-gray-100 dark:text-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-[80%] p-6 rounded-lg shadow-xl overflow-y-auto">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
        onClick={closeHandler}
        aria-label="Close popup"
      >
        <Image src={close} width={20} height={20} alt="Close popup" />
      </button>

      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={asset.market.image}
          width={50}
          height={50}
          alt={`${asset.market.name} logo`}
          className="rounded-full"
        />
        <div>
          <h3 className="text-xl font-bold">
            {asset.market.name} <span className="text-gray-400">({asset.market.symbol.toUpperCase()})</span>
          </h3>
        </div>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Price Section */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-2xl font-extrabold text-blue-400">
          {asset.market.current_price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>
        <div className="flex items-center gap-2">
          <Image
            src={asset.market.price_change_percentage_24h < 0 ? down : up}
            width={20}
            height={20}
            alt="Change direction"
          />
          <span
            className={`text-lg font-semibold ${
              asset.market.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {asset.market.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="text-gray-400">All Time High</h4>
          <p>{asset.market.ath.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        </div>
        <div>
          <h4 className="text-gray-400">From ATH</h4>
          <p>{asset.market.ath_change_percentage.toFixed(2)}%</p>
        </div>
        <div>
          <h4 className="text-gray-400">Market Cap</h4>
          <p>{asset.market.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        </div>
        <div>
          <h4 className="text-gray-400">Circulating Supply</h4>
          <p>{asset.market.circulating_supply.toLocaleString('en-US')}</p>
        </div>
        <div>
          <h4 className="text-gray-400">Total Supply</h4>
          <p>{asset.market.total_supply ? asset.market.total_supply.toLocaleString('en-US') : 'N/A'}</p>
        </div>
        <div>
          <h4 className="text-gray-400">MCap / FDV</h4>
          <p>
            {asset.market.fully_diluted_valuation
              ? (asset.market.market_cap / asset.market.fully_diluted_valuation).toFixed(2)
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  </div>
);
}

export default Details;