import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await getServerSession(authOptions)

	return (
		session.user.role === "admin" ? <>Mange Transactions</> : redirect('/')
	)
}