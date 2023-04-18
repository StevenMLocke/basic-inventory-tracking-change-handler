import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { model } = await req.json()
	const removedModel = await prisma.model.delete({
		where: {
			id: model.id
		}
	})

	return NextResponse.json(removedModel)
}