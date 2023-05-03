import { getData } from "@/lib/helpers"
import ClientWrapper from './../components/mgmtClientWrapper'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await getServerSession(authOptions)
	const itemName = 'Asset'

	const apiUrl = process.env.API
	const assetsData = getData(`${apiUrl}asset/get/assets`)
	const modelsData = getData(`${apiUrl}model/get/models`)
	const locationsData = getData(`${apiUrl}location/get/locations`)

	const [assets, models, locations] = await Promise.all([assetsData, modelsData, locationsData])


	const tableData = assets?.map((asset) => {
		return ({
			asset_number: asset.asset_number,
			id: asset.id,
			serial_number: asset.serial_number,
			model: asset.model.name,
			model_id: asset.model.id,
			manufacturer: asset.model.manufacturer.name,
			location_id: asset.location?.id,
			location_name: asset.location?.name,
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
		},
		{
			Header: 'Serial #',
			accessor: 'serial_number'
		},
		{
			Header: '',
			accessor: 'location_id',
			id: 'location_id',
		},
		{
			Header: 'Location',
			accessor: 'location_name'
		},
	]

	const tableOptions = {
		initialState: {
			hiddenColumns: [
				"id",
				"model_id",
				"location_id",
			]
		}
	}

	const textFields = [
		{
			id: 'asset_number',
			name: 'asset number',
			inputType: 'number',
		},
		{
			id: 'serial_number',
			name: 'serial number',
			inputType: 'text',
			required: true
		},
	]

	const selectFields = [
		{
			id: 'model_id',
			type: 'model',
			data: models?.map(model => {
				return {
					id: model.id,
					name: `${model.manufacturer.name} - ${model.name}`
				}
			})
		},
		{
			id: 'location_id',
			type: 'location',
			data: locations,
			required: false
		},
	]

	return (
		session.user.role === "admin" ? <ClientWrapper
			session={session}
			tableColumns={tableColumns}
			tableData={tableData}
			tableOptions={tableOptions}
			itemName={`${itemName}`}
			inputTextArr={textFields}
			inputSelectArr={selectFields}
			apiUrl={`${apiUrl}${itemName.toLowerCase()}/`}
		></ClientWrapper> : redirect('/')
	)
}