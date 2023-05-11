import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { TransactionClientWrapper } from './../components/tClientWrapper'
import { getData, postData } from '@/lib/helpers'

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/transact/checkin')
	}

	const apiUrl = process.env.API;

	const actionsData = getData(`${apiUrl}action/get/actions`)
	const locationsData = getData(`${apiUrl}location/get/locations`)
	const statusData = getData(`${apiUrl}status/get/statuses`)

	const [actions, locations, statuses] = await Promise.all([actionsData, locationsData, statusData])

	const checkedOutStatus = statuses.filter(status => { return status.name === "Checked Out" })

	const assets = await postData(`${apiUrl}asset/get/assets/byStatus`, checkedOutStatus[0])

	const ids = {
		status: {
			id: statuses.filter((status) => {
				return status.name === "Checked In";
			})[0].id
		},
		action: {
			id: actions.filter((action) => {
				return action.type === "Check In";
			})[0].id
		},
		location: {
			id: locations.filter((location) => {
				return location.name === "In stock";
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

	return (session?.user.role === "admin" || session?.user.role === "transactor") ?
		<>
			<TransactionClientWrapper
				ids={ids}
				assets={assets}
				apiUrl={apiUrl}
				textFieldsArray={textFields}
				action={`checked in`}
				assetCardButtonText={`Check In`}
				heroText={`Asset Check In`}
				assetState={`checked out`}
			>
			</TransactionClientWrapper>
		</> :
		redirect('/')
}