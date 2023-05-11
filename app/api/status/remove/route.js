import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const status = await req.json()
	const removedStatus = await prisma.status.delete({
		where: {
			id: status.id
		}
	})

	return NextResponse.json(removedStatus)
}