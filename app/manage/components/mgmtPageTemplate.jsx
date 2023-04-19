import { getData } from "@/lib/helpers";
import ClientWrapper from "./mgmtClientWrapper";

export default async function Page() {
	const apiUrl = process.env.API;
	const itemName = "";
	const itemNamesData = getData(
		`${apiUrl}${itemName.toLowerCase()}/get/${itemName.toLowerCase()}s`
	);

	const [] = await Promise.all([]);

	const tableData = [];

	const tableColumns = [
		{
			Header: "",
			accessor: "id",
			id: "id",
		},
	];

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id"],
		},
	};

	const textFields = [
		/* 		{
			id: '', //db column
			name: '',  
			inputType: '',
		}, */
	];

	const selectFields = [
		/* 		{
			id: '',
			type: '',
			data: [items].map(item => {
				return {
					id: item.id,
					name: `<item>`
				}
			})
		},
	 */
	];

	return (
		<>
			<ClientWrapper
				tableColumns={tableColumns}
				tableData={tableData}
				tableOptions={tableOptions}
				itemName={`${itemName}`}
				inputTextArr={textFields}
				inputSelectArr={selectFields}
				apiUrl={`${apiUrl}${itemName.toLowerCase()}/`}
			></ClientWrapper>
		</>
	);
}
