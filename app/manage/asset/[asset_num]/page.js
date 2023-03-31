import { postData } from "@/lib/helpers"

export default async function Page({ params }) {
	const { asset_num } = params
	const data = { asset_number: asset_num }

	const asset = await postData('http://localhost:3000/api/asset/get/asset', data)
	return (
		<>
			<div className="flex flex-1 justify-center">
				<div className="flex flex-col border-2 border-white items-center justify-evenly">
					<div className="flex border-2 border-red-700 w-full justify-center">
						<div className="card card-compact card-bordered bg-base-300 shadow-sm shadow-neutral-300">
							<div className="card-body">
								<h2 className="card-title">Asset</h2>
								<p>Asset#: {asset.asset_number}</p>
								<p>Model: {asset.model.name}</p>
								<p>Manufacturer: {asset.model.manufacturer.name}</p>
							</div>
						</div>
					</div>
					<pre>{JSON.stringify(asset, null, 2)}</pre>
				</div>
			</div>
		</>
	)
}