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

	const rowNum = (row) => row.index

	const tableColumns = [
		{
			Header: '',
			accessor: 'id',
			id: 'id'
		},
		{
			Header: 'Asset #',
			accessor: 'asset_number'
		},
		{
			Header: 'Model',
			accessor: 'model'
		},
		{
			Header: 'Manufacturer',
			accessor: 'manufacturer'
		}
	]

	return (
		<>
			<ClientWrapper tableColumns={tableColumns} tableData={tableData} itemName={`Asset`}></ClientWrapper>
		</>
	)
}