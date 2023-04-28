import { getData } from "@/lib/helpers";
import ClientWrapper from "./../components/mgmtClientWrapper";

export default async function Page() {
	const apiUrl = process.env.API;
	const itemName = "Role";

	const roles = await getData(
		`${apiUrl}${itemName.toLowerCase()}/get/${itemName.toLowerCase()}s`
	);

	const tableData = roles;

	const tableColumns = [
		{
			Header: "",
			accessor: "id",
			id: "id",
		},
		{
			Header: "Roles",
			accessor: "name"
		}
	];

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id"],
		},
	};

	const textFields = [
		{
			id: 'name', //db column
			name: ' role',
			inputType: 'text',
		},
	];

	return (
		<>
			<ClientWrapper
				tableColumns={tableColumns}
				tableData={tableData}
				tableOptions={tableOptions}
				itemName={`${itemName}`}
				inputTextArr={textFields}
				apiUrl={`${apiUrl}${itemName.toLowerCase()}/`}
			></ClientWrapper>
		</>
	);
}
