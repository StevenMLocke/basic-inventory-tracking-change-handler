import { getData } from "@/lib/helpers";
import ClientWrapper from "@/components/mgmtClientWrapper";

export default async function Page() {
	const apiUrl = process.env.API;
	const itemName = "Model";
	const modelsData = getData(`${apiUrl}${itemName.toLowerCase()}/get/${itemName.toLowerCase()}s`);
	const manufacturersData = getData(`${apiUrl}manufacturer/get/manufacturers`)

	const [models, manufacturers] = await Promise.all([modelsData, manufacturersData]);

	const tableData = models.map(model => {
		return ({
			id: model.id,
			name: model.name,
			manufacturer_name: model.manufacturer.name,
			manufacturer_id: model.manufacturer.id
		})
	});

	const tableColumns = [
		{
			Header: "",
			accessor: "id",
			id: "id",
		},
		{
			Header: "",
			accessor: "manufacturer_id",
			id: "manufacturer_id"
		},
		{
			Header: "Model",
			accessor: "name",
		},
		{
			Header: "Manufacturer",
			accessor: "manufacturer_name"
		}
	];

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id", "manufacturer_id"],
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
