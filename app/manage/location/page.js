import { getData } from "@/lib/helpers";
import ClientWrapper from "./../components/mgmtClientWrapper";

export default async function Page() {
	const apiUrl = process.env.API;
	const itemName = "Location";
	const locationsData = getData(
		`${apiUrl}${itemName.toLowerCase()}/get/${itemName.toLowerCase()}s`
	);

	const [locations] = await Promise.all([locationsData]);

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
