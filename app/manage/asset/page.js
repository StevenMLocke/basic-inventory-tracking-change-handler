import { getData } from "@/lib/helpers"
import ClientWrapper from "@/components/clientWrapper"

export default async function Page() {
	const apiUrl = process.env.API
	const assets = await getData(`${apiUrl}asset/get/assets`)
	const tableData = assets.map((asset) => {
		return ({
			asset_number: asset.asset_number,
			id: asset.id,
			model: asset.model.name,
			manufacturer: asset.model.manufacturer.name
		})
	})


	return (
		<>
			<pre>{JSON.stringify(assets, null, 2)}</pre>
		</>
	)
}