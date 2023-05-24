import ClientWrapper from "./../components/mgmtClientWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/manage/model')
	}

	const apiUrl = process.env.API;
	const itemName = "Model";

	const models = await prisma.model.findMany({
		select: {
			id: true,
			name: true,
			manufacturer: {
				select: {
					id: true,
					name: true
				}
			}
		},
		orderBy: {
			manufacturer: {
				name: 'asc'
			}
		}
	})

	const manufacturers = await prisma.manufacturer.findMany()

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
		{
			id: 'name', //db column
			name: 'model name',
			inputType: 'text',
		},
	];

	const selectFields = [
		{
			id: 'manufacturer_id', //db col
			type: 'manufacturer',
			data: manufacturers.map(item => {
				return {
					id: item.id,
					name: `${item.name}`
				}
			})
		},
	];

	return (
		session.user.role === "admin" ||
			session.user.role === "asset manager" ? <ClientWrapper
				session={session}
				tableColumns={tableColumns}
				tableData={tableData}
				tableOptions={tableOptions}
				itemName={`${itemName}`}
				inputTextArr={textFields}
				inputSelectArr={selectFields}
				apiUrl={`${apiUrl}${itemName.toLowerCase()}/`}
			></ClientWrapper> : redirect('/')
	);
}
