import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { TransactionTable } from './../../transact/components/transactionsTable'
import SectionHero from "@/components/sectionHero"

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/transact/checkin')
	}

	const apiUrl = process.env.API;

	const transactions = await prisma.transaction.findMany({
		select: {
			date: true,
			asset: {
				select: {
					asset_number: true,
					model: {
						select: {
							name: true,
							manufacturer: {
								select: {
									name: true
								}
							}
						}
					},
					serial_number: true
				}
			},
			action: {
				select: {
					type: true
				}
			},
			user_transaction_action_user_idTouser: {
				select: {
					full_name: true
				},

			},
			user_transaction_asset_user_idTouser: {
				select: {
					full_name: true,
					email: true
				}
			},
		},
		orderBy: {
			date: 'desc'
		}
	})

	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-col flex-1 min-w-full items-center'>
				<SectionHero title={`Transactions`}></SectionHero>
				<TransactionTable dataData={transactions}></TransactionTable>
				{/* 		<pre>{JSON.stringify(transactions[2], null, 2)}</pre> */}
			</div>
		</div>
	)
}