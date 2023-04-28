import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { role } = await req.json()
	const editedRole = await prisma.role.update({
		where: {
			id: role.id
		},
		data: role
	})

	return NextResponse.json(editedRole)
}