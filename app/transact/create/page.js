import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import prisma from "@/lib/db"
import { CreateAssetClientWrapper } from './../components/createAssetClientWrapper'

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/transact/checkin')
	}

	const apiUrl = process.env.API;

	const actions = await prisma.action.findMany()
	const locations = await prisma.location.findMany()
	const statuses = await prisma.status.findMany()
	const models = await prisma.model.findMany({
		include: {
			manufacturer: true
		}
	})


	const ids = {
		action: {
			id: actions.filter((action) => {
				return action.type === "Create New Asset";
			})[0].id
		},
		location: {
			id: locations.filter((location) => {
				return location.name === "In stock";
			})[0].id
		},
		status: {
			id: statuses.filter((status) => {
				return status.name === "Checked In"
			})[0].id
		},
		transactor: { id: session.user.id },
	}

	const textFields = [
		{
			id: 'asset_number',
			name: 'asset number',
			inputType: 'number',
			required: true
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
		session?.user.role === "admin" ||
		session?.user.role === "transactor" ||
		session.user.role === "asset manager"
	) ?
		<>
			<CreateAssetClientWrapper
				ids={ids}
				apiUrl={apiUrl}
				textFieldsArray={textFields}
				selectArray={selectFields}
				heroText={`Create New Asset`}
			>
			</CreateAssetClientWrapper>
			{/* 			<pre>{JSON.stringify(models, null, 2)}</pre> */}
		</> :
		redirect('/')
}