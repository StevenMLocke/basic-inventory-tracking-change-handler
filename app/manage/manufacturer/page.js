import { getData } from "@/lib/helpers";
import ClientWrapper from "./../components/mgmtClientWrapper"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await getServerSession(authOptions)

	const apiUrl = process.env.API;
	const itemName = "Manufacturer";
	const manufacturersData = getData(
		`${apiUrl}${itemName.toLowerCase()}/get/${itemName.toLowerCase()}s`
	);

	const [manufacturers] = await Promise.all([manufacturersData]);

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
			name: 'name',
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
