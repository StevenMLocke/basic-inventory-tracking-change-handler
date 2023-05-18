import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { getData } from '@/lib/helpers'
import { TransactionTable } from './../components/transactionsTable'
import SectionHero from "@/components/sectionHero"

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/transact/checkin')
	}

	const apiUrl = process.env.API;

	const transactions = await getData(`${apiUrl}transaction/get/transactions`)
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