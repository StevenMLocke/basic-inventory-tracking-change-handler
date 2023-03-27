import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const model = await req.json()

	const fetchedModel = await prisma.model.findUnique({
		where: {
			id: model.id
		}
	})

	return NextResponse.json(fetchedModel)
}