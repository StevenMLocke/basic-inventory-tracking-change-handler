import { getData } from "@/lib/helpers"
import ClientWrapper from "@/components/clientWrapper"

export default async function Page() {
	const apiUrl = process.env.API
	const assetsData = getData(`${apiUrl}asset/get/assets`)
	const modelsData = getData(`${apiUrl}model/get/models`)

	const [assets, models] = await Promise.all([assetsData, modelsData])

	const tableData = assets.map((asset) => {
		return ({
			asset_number: asset.asset_number,
			id: asset.id,
			model: asset.model.name,
			model_id: asset.model.id,
			manufacturer: asset.model.manufacturer.name
		})
	})

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
			Header: 'Model id',
			accessor: 'model_id',
			id: 'model_id',
		},
		{
			Header: 'Manufacturer',
			accessor: 'manufacturer'
		}
	]

	const tableOptions = {
		initialState: {
			hiddenColumns: [
				"id",
				"model_id",
			]
		}
	}

	const textFields = [
		{
			id: 'assetNumber',
			name: 'asset_number',
			inputType: 'number'
		},
	]

	const selectFields = [
		{
			id: 'model_id',
			type: 'model',
			data: models.map(model => {
				return {
					id: model.id,
					name: `${model.manufacturer.name} - ${model.name}`
				}
			})
		},
	]

	return (
		<>
			<ClientWrapper
				tableColumns={tableColumns}
				tableData={tableData}
				tableOptions={tableOptions}
				itemName={`Asset`}
				inputTextArr={textFields}
				inputSelectArr={selectFields}
				apiUrl={apiUrl}
			>
			</ClientWrapper>
		</>
	)
}