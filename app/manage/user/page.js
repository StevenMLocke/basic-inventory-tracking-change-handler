import ClientWrapper from "./../components/mgmtClientWrapper"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function Page(req) {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/manage/user')
	}

	const role = session?.user.role
	const apiUrl = process.env.API;
	const itemName = "User";

	const roles = await prisma.role.findMany()
	const users = await prisma.user.findMany({
		select: {
			id: true,
			fn: true,
			ln: true,
			full_name: true,
			email: true,
			role: true,
			authorized_bitch_user: true,
		},
		orderBy: {
			full_name: 'asc'
		}
	})

	const tableData = users.map(user => {
		return {
			id: user.id,
			fn: user.fn,
			ln: user.ln,
			email: user.email,
			role_name: user.role?.name,
			role_id: user.role?.id,
			authorized_bitch_user: user.authorized_bitch_user ? 'Yes' : 'No'
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
			accessor: 'role_name',
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
			accessor: 'authorized_bitch_user',
		})
	}

	const tableOptions = {
		initialState: {
			hiddenColumns: ["id", "role_id"],
			pageSize: 25,
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
		(session?.user.role === "admin" || session?.user.role === "transactor" ||
			session.user.role === "asset manager") ? <ClientWrapper
				req={req}
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
