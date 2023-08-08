import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { TransactionClientWrapper } from './../components/checkOutWrapper'
import prisma from "@/lib/db"

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/transact/checkout')
	}

	const apiUrl = process.env.API;

	const actions = await prisma.action.findMany()
	const locations = await prisma.location.findMany({
		where: {
			OR: [
				{ name: "Checked out to student" },
				{ name: "Checked out to staff" },
			]
		}
	})
	const statuses = await prisma.status.findMany()
	const users = await prisma.user.findMany({
		select: {
			id: true,
			fn: true,
			ln: true,
			full_name: true,
			email: true,
			role: true,
		},
		orderBy: {
			ln: 'asc'
		}
	})

	const formattedUsers = users.map((user) => {
		return {
			value: user.id,
			label: `${user.ln}, ${user.fn} - ${user.email}`
		}
	})

	const [{ id }] = statuses.filter(status => { return status.name === "Checked In" })

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
			status_id: id
		}
	})

	const ids = {
		status: {
			id: statuses.filter((status) => {
				return status.name === "Checked Out";
			})[0].id
		},
		action: {
			id: actions.filter((action) => {
				return action.type === "check out";
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

	return (session?.user.role === "admin" || session?.user.role === "transactor" || session.user.role === "asset manager") ?
		<>
			<TransactionClientWrapper
				users={formattedUsers}
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