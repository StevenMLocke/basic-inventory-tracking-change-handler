import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { id } = await req.json()
	const removedAction = await prisma.action.delete({
		where: {
			id,
		}
	})

	return NextResponse.json(removedAction)
}