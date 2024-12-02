'use client'

import Image from 'next/image'
import close from '@/app/assets/close.svg'
import { Button } from '@/components/ui/button'

const Remove = ({ setIsRemoveAssetsModalOpen, assets, setAssets }) => {

	const removeAssetHandler = (e) => {
		e.preventDefault()
		const assetToRemove = e.target.removeAsset.value;
		const assetsArr = assets.filter((assetObj) => assetObj.id !== assetToRemove)
		setAssets(assetsArr)
		setIsRemoveAssetsModalOpen(false)

		// Save assets to localStorage
  	localStorage.setItem('assets', JSON.stringify(assetsArr));
	}

	const closeHandler = () => {
		setIsRemoveAssetsModalOpen(false)
	}

	return (
		<div className="popup fixed top-0 left-0 z-[100] bg-black/50 w-full h-full">
			<div className="popup__content remove__assets absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary-light text-light dark:bg-secondary-dark dark:text-white w-[30%] h-[fit] p-4 rounded-lg">
				<h3 className="dark:text-white">Remove Asset</h3>
				<br />

				<div className="absolute top-[10%] left-[95%] transform -translate-x-1/2 -translate-y-1/2">
					<button>
						<Image
							src={close}
							width={25}
							height={25}
							onClick={closeHandler}
							alt="Close popup"
						/>
					</button>
				</div>

				<form onSubmit={removeAssetHandler}>
					<select name="removeAsset" id="removeAsset" className="h-10 px-4 py-2 border-none rounded-md font-josefin font-semibold mb-4">
						{assets && (
							assets.map((assetObj, index) => (
								<option key={index} value={assetObj.id}>{assetObj.id.toUpperCase()}</option>
							))
						)}
					</select>
					<br />
					<Button>
						<input type="submit" />
					</Button>
				</form>
			</div>
		</div>
	)
}

export default Remove;
