import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { DisposeAssetClientWrapper } from '../components/disposeAssetClientWrapper'
import prisma from "@/lib/db"

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/transact/dispose')
	}

	const apiUrl = process.env.API;

	const actions = await prisma.action.findMany()
	const locations = await prisma.location.findMany({
		where: {
			NOT: {
				OR: [
					{ name: "Checked out to staff" },
					{ name: "Checked out to student" },
				]
			}
		}
	})
	const statuses = await prisma.status.findMany()
	const filteredStatusIds = statuses.filter(status => {
		return status.name === "Disposed" ||
			status.name === "Checked Out"
	})

	//get assets that are NOT already disposed
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
		where: {
			NOT: {
				OR: [
					{ status_id: filteredStatusIds[0].id },
					{ status_id: filteredStatusIds[1].id }
				]
			}
		},
		orderBy: {
			asset_number: "asc"
		}
	})

	const ids = {
		status: {
			id: statuses.filter((status) => {
				return status.name === "Disposed";
			})[0].id
		},
		action: {
			id: actions.filter((action) => {
				return action.type === "destroy";
			})[0].id
		},
		location: {
			id: locations.filter((location) => {
				return location.name === "Destroyed forever";
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

	return (session?.user.role === "admin") ?
		<>
			<DisposeAssetClientWrapper
				ids={ids}
				assets={assets}
				apiUrl={apiUrl}
				textFieldsArray={textFields}
				action={`disposed`}
				assetCardButtonText={`Dispose`}
				heroText={`Dispose Asset`}
				assetState={"available to dispose"}
			>
			</DisposeAssetClientWrapper>
		</> :
		redirect('/')
}