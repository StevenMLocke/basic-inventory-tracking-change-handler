import ClientWrapper from "./../components/mgmtClientWrapper"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/manage/manufacturer')
	}

	const apiUrl = process.env.API;
	const itemName = "Manufacturer";

	const manufacturers = await prisma.manufacturer.findMany()

	const tableData = manufacturers;

	const tableColumns = [
		{
			Header: "",
			accessor: "id",
			id: "id",
		},
		{
			Header: "Name",
			accessor: "name",
			Filter: '',
		},
	];

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id"],
			pageSize: 25,
		},
	};

	const textFields = [
		{
			id: 'name', //db column
			name: 'name',
			inputType: 'text',
		},
	];

	return (
		session.user.role === "admin" ||
			session.user.role === "asset manager" ? <ClientWrapper
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
