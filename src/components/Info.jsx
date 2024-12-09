'use client'

import Image from 'next/image'
import close from '@/app/assets/close.svg'
import up from '@/app/assets/up-white.svg'
import down from '@/app/assets/down-white.svg'
import favicon from '@/app/favicon.ico'

const Info = ({ setIsInfoModalOpen }) => {
	const closeHandler = () => {
		setIsInfoModalOpen(false)
	}

return (
  <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50">
    <div className="flex flex-col relative bg-secondary-dark text-gray-100 dark:text-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-[80%] p-6 rounded-lg shadow-xl overflow-y-auto">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
        onClick={closeHandler}
        aria-label="Close popup"
      >
        <Image src={close} width={20} height={20} alt="Close popup" />
      </button>

      {/* Header Section */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <Image
          src={favicon} width={50} height={50} alt="Rocket portfolio logo"
        />
        <h3>Hello frend! Are you finding this tool useful?</h3>
        <br />
        <p>Please consider supporting my work by donating ETH to STORMCRYPTO.eth</p>
        <address>Thank you very much</address>
      </div>
    </div>
  </div>
);
}

export default Info;