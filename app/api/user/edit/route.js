import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
	const { user } = await req.json()
	delete user.role_name
	if (user.authorized_bitch_user) {
		user.authorized_bitch_user = (user.authorized_bitch_user === "Yes" || user.authorized_bitch_user === 1) ? 1 : 0
		user.authorized_bitch_user = +user.authorized_bitch_user
	}

	const editedUser = await prisma.user.update({
		where: {
			id: user.id
		},
		data: user
	})

	return NextResponse.json(editedUser)
}