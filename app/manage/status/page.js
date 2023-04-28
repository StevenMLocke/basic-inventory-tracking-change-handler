import { getData } from "@/lib/helpers";
import ClientWrapper from "./../components/mgmtClientWrapper";

export default async function Page() {
	const apiUrl = process.env.API;
	const itemName = "Status";
	const statusesData = getData(
		`${apiUrl}${itemName.toLowerCase()}/get/${itemName.toLowerCase()}es`
	);

	const [statuses] = await Promise.all([statusesData]);

	const tableData = statuses

	const tableColumns = [
		{
			Header: "",
			accessor: "id",
			id: "id",
		},
		{
			Header: "Status",
			accessor: 'status'
		}
	];

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id"],
		},
	};

	const textFields = [
		{
			id: 'status', //db column
			name: 'status',
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
			>
			</ClientWrapper>
		</>
	);
}
