import { getData } from "@/lib/helpers";
import ClientWrapper from "./../components/mgmtClientWrapper"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await getServerSession(authOptions)
	const role = session?.user.role
	const apiUrl = process.env.API;
	const itemName = "User";

	const usersData = getData(`${apiUrl}${itemName.toLowerCase()}/get/${itemName.toLowerCase()}s`);
	const rolesData = getData(`${apiUrl}/role/get/roles`)

	const [users, roles] = await Promise.all([usersData, rolesData]);

	const tableData = users.map(user => {
		return {
			id: user.id,
			fn: user.fn,
			ln: user.ln,
			email: user.email,
			role_name: user.role?.name,
			role_id: user.role?.id,
			authorized_bitch_user: user.authorized_bitch_user
		}
	})

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
		},
		{
			Header: 'Role',
			accessor: 'role_name'
		},
		{
			Header: "",
			accessor: 'role_id',
			id: 'role_id'
		},
	];

	if (role === "admin") {
		tableColumns.push({
			Header: 'Authorized?',
			accessor: 'authorized_bitch_user'
		})
	}

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id", "role_id"],
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

	let selectFields = []

	if (role === "admin") {
		selectFields = [
			{
				id: 'role_id',
				type: 'role',
				required: false,
				data: roles.map(role => {
					return {
						id: role.id,
						name: role.name
					}
				})
			},
			{
				id: 'authorized_bitch_user',
				type: 'authorization',
				required: false,
				data: [
					{ id: 1, name: "Authorized" },
					{ id: 0, name: "Not Authorized" }
				]
			}
		];
	}

	return (
		(session.user.role === "admin" || session.user.role === "transactor") ? <ClientWrapper
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
