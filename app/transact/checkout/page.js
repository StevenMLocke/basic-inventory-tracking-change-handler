import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { TransactionClientWrapper } from './../components/tClientWrapper'
import { getData, postData } from '@/lib/helpers'

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/transact/checkout')
	}

	const apiUrl = process.env.API;

	const actionsData = getData(`${apiUrl}action/get/actions`, { next: { revalidate: 100 } })
	const locationsData = getData(`${apiUrl}location/get/locations`, { next: { revalidate: 100 } })
	const statusData = getData(`${apiUrl}status/get/statuses`, { next: { revalidate: 100 } })
	const usersData = getData(`${apiUrl}user/get/users`, { next: { revalidate: 100 } })

	const [actions, locations, statuses, users] = await Promise.all([actionsData, locationsData, statusData, usersData])

	const checkedInStatus = statuses.filter(status => { return status.name === "Checked In" })

	const assets = await postData(`${apiUrl}asset/get/assets/byStatus`, checkedInStatus[0])

	const ids = {
		status: {
			id: statuses.filter((status) => {
				return status.name === "Checked Out";
			})[0].id
		},
		action: {
			id: actions.filter((action) => {
				return action.type === "Check Out";
			})[0].id
		},
		transactor: { id: session.user.id },
	}

	const textFields = [
		{
			id: 'asset_number',
			name: 'asset number',
			inputType: 'number',
		},
	]

	const selectFields = [
		{
			id: 'asset_user_id',
			type: 'user',
			required: false,
			data: users.map(user => {
				return {
					id: user.id,
					name: user.full_name
				}
			})
		},
		{
			id: 'location_id',
			type: 'location',
			required: false,
			data: locations.map(location => {
				return {
					id: location.id,
					name: location.name
				}
			})
		},
	];

	return (session?.user.role === "admin" || session?.user.role === "transactor") ?
		<>
			<TransactionClientWrapper
				ids={ids}
				assets={assets}
				apiUrl={apiUrl}
				textFieldsArray={textFields}
				selectArray={selectFields}
				action={`checked out`}
				heroText={`Asset Check Out`}
				assetCardButtonText={'Check Out'}
				assetState={`available to checkout`}
				out={true}
			>
			</TransactionClientWrapper>
		</> :
		redirect('/')
}