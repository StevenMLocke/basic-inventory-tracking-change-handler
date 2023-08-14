import ClientWrapper from './../components/mgmtClientWrapper'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { dateToString } from '@/lib/clientHelpers'

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/manage/asset')
	}

	const itemName = 'Asset'

	const role = session?.user.role
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
			category: {
				select: {
					id: true,
					name: true
				}
			},
			status: true,
			user: {
				select: {
					fn: true,
					ln: true,
					full_name: true,
					email: true
				}
			},
			funding_source: true,
			purchase_date: true,
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

	const fundingSources = await prisma.funding_source.findMany()

	const categories = await prisma.category.findMany()

	const tableData = assets?.map((asset) => {
		return ({
			asset_number: asset.asset_number,
			id: asset.id,
			serial_number: asset.serial_number,
			category: asset?.category?.name,
			category_id: asset?.category?.id,
			model: asset.model.name,
			model_id: asset.model.id,
			manufacturer: asset.model.manufacturer.name,
			location_id: asset.location?.id,
			location_name: asset.location?.name,
			status_name: asset.status?.name,
			status_id: asset?.status?.id,
			user_email: asset.user?.email,
			funding_source: asset.funding_source,
			purchase_date: asset.purchase_date ? dateToString(new Date(asset.purchase_date).toISOString().split('T')[0]) : null,
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
			maxWidth: 75,
		},
		{
			Header: 'Model',
			accessor: 'model',
		},
		{
			Header: 'Model id',
			accessor: 'model_id',
			id: 'model_id',
		},
		{
			Header: 'Manufacturer',
			accessor: 'manufacturer',
		},
		{
			Header: 'Serial #',
			accessor: 'serial_number'
		},
		{
			Header: '',
			accessor: 'category_id',
			id: 'category_id'
		},
		{
			Header: 'Category',
			accessor: 'category'
		},
		{
			Header: '',
			accessor: 'funding_source.id',
			id: 'funding_source_id'
		},
		{
			Header: 'Funding Source',
			accessor: 'funding_source.name',
			id: 'funding_source_name',
		},
		{
			Header: 'Purchase Date',
			accessor: 'purchase_date',
		},
	]

	const tableOptions = {
		initialState: {
			hiddenColumns: [
				"id",
				"model_id",
				"location_id",
				"status_id",
				"funding_source_id",
				"category_id",
			],
			pageSize: 25
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

	if (role === "admin") {
		selectFields.push(
			{
				id: 'funding_source_id',
				type: ' funding source',
				data: fundingSources.map(fSource => {
					return {
						id: fSource.id,
						name: fSource.name
					}
				}),
			}
		)
		selectFields.push(
			{
				id: 'category_id',
				type: ' category',
				data: categories.map((category) => {
					return {
						id: category.id,
						name: category.name
					}
				})
			}
		)
	}

	const dateInputArr = [
		{
			id: 'purchase_date',
			placeholderText: "Purchase Date...",
			disabledValue: false,
			required: false,
		}
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
				inputDateArr={dateInputArr}
				apiUrl={`${apiUrl}${itemName.toLowerCase()}/`}
			></ClientWrapper> : redirect('/')
	)
}