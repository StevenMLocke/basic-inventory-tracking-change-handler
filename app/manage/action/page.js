import { getData } from "@/lib/helpers";
import ClientWrapper from "@/components/mgmtClientWrapper";

export default async function Page() {
	const apiUrl = process.env.API;
	const itemName = "Action";
	const actionsData = getData(`${apiUrl}${itemName.toLowerCase()}/get/${itemName.toLowerCase()}s`);
	const [actions] = await Promise.all([actionsData]);

	const tableData = actions;

	const tableColumns = [
		{
			Header: "",
			accessor: "id",
			id: "id",
		},
		{
			Header: "Action Type",
			accessor: "type"
		}
	];

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id"],
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