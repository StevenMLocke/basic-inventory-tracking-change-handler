import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { model } = await req.json()
	delete model.manufacturer_name
	const editedModel = await prisma.model.update({
		where: {
			id: model.id
		},
		data: model
	})

	return NextResponse.json(editedModel)
}