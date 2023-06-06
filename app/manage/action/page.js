import ClientWrapper from "./../components/mgmtClientWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/manage/action')
	}

	const apiUrl = process.env.API;
	const itemName = "Action";

	const actions = await prisma.action.findMany()

	const tableData = actions;

	const tableColumns = [
		{
			Header: "",
			accessor: "id",
			id: "id",
		},
		{
			Header: "Action Type",
			accessor: "type",
			Filter: '',
		}
	];

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id"],
			pageSize: 25
		},
	};

	const textFields = [
		{
			id: 'type', //db column
			name: 'Action',
			inputType: 'text',
		}
	];

	return (
		session.user.role === "admin" ? <ClientWrapper
			session={session}
			tableColumns={tableColumns}
			tableData={tableData}
			tableOptions={tableOptions}
			itemName={`${itemName}`}
			inputTextArr={textFields}
			apiUrl={`${apiUrl}${itemName.toLowerCase()}/`}
		></ClientWrapper> : redirect('/')
	);
}