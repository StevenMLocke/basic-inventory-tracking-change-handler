import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { TransactionClientWrapper } from './../components/tClientWrapper'
import prisma from "@/lib/db"

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/transact/checkin')
	}

	const apiUrl = process.env.API;

	const actions = await prisma.action.findMany()
	const locations = await prisma.location.findMany()
	const statuses = await prisma.status.findMany()

	const [{ id }] = statuses.filter(status => { return status.name === "Checked Out" })

	const assets = await prisma.asset.findMany({
		select: {
			id: true,
			asset_number: true,
			serial_number: true,
			model: {
				select: {
					manufacturer: {
						select: {
							name: true,
						}
					},
					name: true,
				}
			},
			user: {
				select: {
					id: true,
					full_name: true,
					email: true
				}
			},
		},
		/* 		where: {
					status_id: id
				} */
	})

	const ids = {
		status: {
			id: statuses.filter((status) => {
				return status.name === "Checked In";
			})[0].id
		},
		action: {
			id: actions.filter((action) => {
				return action.type === "check in";
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

	return (session?.user.role === "admin" || session?.user.role === "transactor" || session.user.role === "asset manager") ?
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