import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { action } = await req.json()
	const editedAction = await prisma.action.update({
		where: {
			id: action.id
		},
		data: action
	})

	return NextResponse.json(editedAction)
}