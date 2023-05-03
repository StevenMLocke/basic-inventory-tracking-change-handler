import { getData } from "@/lib/helpers";
import ClientWrapper from "./../components/mgmtClientWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await getServerSession(authOptions)

	const apiUrl = process.env.API;
	const itemName = "Location";
	const locations = await getData(
		`${apiUrl}${itemName.toLowerCase()}/get/${itemName.toLowerCase()}s`
	);

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
