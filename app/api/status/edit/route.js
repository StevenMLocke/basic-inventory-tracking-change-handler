
import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { status } = await req.json()
	const editedStatus = await prisma.status.update({
		where: {
			id: status.id,
		},
		data: status
	})

	return NextResponse.json(editedStatus)
}