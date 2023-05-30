import ClientWrapper from './../components/mgmtClientWrapper'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/manage/fundingSource')
	}

	const itemName = 'Funding Source'
	const role = session?.user.role
	const apiUrl = process.env.API

	const fundingSources = await prisma.funding_source.findMany()


	const tableData = fundingSources?.map((fSource) => {
		return ({
			id: fSource.id,
			name: fSource.name
		})
	})

	const tableColumns = [
		{
			Header: '',
			accessor: 'id',
			id: 'id'
		},
		{
			Header: 'Source Name',
			accessor: 'name',
		},
	]

	const tableOptions = {
		initialState: {
			hiddenColumns: [
				"id",
			]
		}
	}

	const textFields = [
		{
			id: 'name',
			name: 'funding source',
			inputType: 'text',
		},
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
				apiUrl={`${apiUrl}${itemName.toLowerCase().split(' ').join('')}/`}
			></ClientWrapper> : redirect('/')
	)
}