import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import SectionHero from "@/components/sectionHero"
import { ReadTable } from '@/components/readTable'
import { Suspense } from "react"

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/transact/checkin')
	}

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
					serial_number: true,
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
			location: {
				select: {
					name: true
				}
			}
		},
		orderBy: {
			date: 'desc'
		}
	})

	const data = transactions.map(transaction => {
		const dateToString = (transaction) => {
			const dateObj = new Date(transaction.date);
			return dateObj.toLocaleDateString("en-us", {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		}

		return ({
			date: dateToString(transaction),
			action: transaction.action.type,
			asset: transaction.asset,
			asset_user: transaction?.user_transaction_asset_user_idTouser,
			transactor: transaction?.user_transaction_action_user_idTouser?.full_name,
			location: transaction?.location?.name
		})
	})

	return (
		<div className='flex flex-col min-w-full items-center'>
			<SectionHero title={`Transactions`}></SectionHero>
			<Suspense fallback={<p>Suspenseful!!!</p>}>
				<ReadTable dataData={data}></ReadTable>
			</Suspense>
			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
		</div>
	)
}