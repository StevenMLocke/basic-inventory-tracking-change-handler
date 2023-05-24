import ClientWrapper from './../components/mgmtClientWrapper'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/manage/asset')
	}

	const itemName = 'Asset'

	const apiUrl = process.env.API

	const assets = await prisma.asset.findMany({
		select: {
			id: true,
			model: {
				select: {
					id: true,
					name: true,
					manufacturer: {
						select: {
							id: true,
							name: true
						}
					}
				}
			},
			asset_number: true,
			location: {
				select: {
					id: true,
					name: true
				}
			},
			serial_number: true,
			status: true,
			user: {
				select: {
					fn: true,
					ln: true,
					full_name: true,
					email: true
				}
			},
		},
		orderBy: {
			asset_number: 'asc'
		}
	})

	const models = await prisma.model.findMany({
		select: {
			id: true,
			name: true,
			manufacturer: {
				select: {
					id: true,
					name: true
				}
			}
		},
		orderBy: {
			manufacturer: {
				name: 'asc'
			}
		}
	})


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
			status_name: asset.status?.name,
			status_id: asset?.status?.id,
			user_email: asset.user?.email
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
			accessor: 'asset_number',
			maxWidth: 75
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
		{
			Header: 'Status',
			accessor: 'status_name'
		},
		{
			Header: '',
			accessor: 'status_id',
			id: 'status_id'
		},
	]

	const tableOptions = {
		initialState: {
			hiddenColumns: [
				"id",
				"model_id",
				"location_id",
				"status_id"
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
	]

	return (
		session.user.role === "admin" ||
			session.user.role === "asset manager" ? <ClientWrapper
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