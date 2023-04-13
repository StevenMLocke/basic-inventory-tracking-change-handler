import { getData } from "@/lib/helpers"
import { Table } from '@/components/reactTable'
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

	const tableColumns = [
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