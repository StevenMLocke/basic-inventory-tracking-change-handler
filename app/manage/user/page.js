import { getData } from "@/lib/helpers";
import ClientWrapper from "./../components/mgmtClientWrapper"
export default async function Page() {
	const apiUrl = process.env.API;
	const itemName = "User";

	const usersData = getData(`${apiUrl}${itemName.toLowerCase()}/get/${itemName.toLowerCase()}s`);

	const [users] = await Promise.all([usersData]);

	const tableData = users

	const tableColumns = [
		{
			Header: "",
			accessor: "id",
			id: "id",
		},
		{
			Header: 'First Name',
			accessor: 'fn',
		},
		{
			Header: 'Last Name',
			accessor: 'ln',
		},
		{
			Header: 'Email',
			accessor: 'email',
		}
	];

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id"],
		},
	};

	const textFields = [
		{
			id: 'fn',
			name: 'first name',
			inputType: 'text',
		},
		{
			id: 'ln',
			name: 'last name',
			inputType: 'text'
		},
		{
			id: 'email',
			name: 'email',
			inputType: 'email'
		}
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
		<ClientWrapper
			tableColumns={tableColumns}
			tableData={tableData}
			tableOptions={tableOptions}
			itemName={`${itemName}`}
			inputTextArr={textFields}
			inputSelectArr={selectFields}
			apiUrl={`${apiUrl}${itemName.toLowerCase()}/`}
		></ClientWrapper>
	);
}
