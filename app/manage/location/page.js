import ClientWrapper from "./../components/mgmtClientWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/manage/location')
	}

	const apiUrl = process.env.API;
	const itemName = "Location";

	const locations = await prisma.location.findMany()

	const tableData = locations;

	const tableColumns = [
		{
			Header: "",
			accessor: "id",
			id: "id",
		},
		{
			Header: "Location",
			accessor: "name",
		},
	];

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id"],
		},
	};

	const textFields = [
		{
			id: 'name', //db column
			name: 'location',
			inputType: 'text',
		},
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
