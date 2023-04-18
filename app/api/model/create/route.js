import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { model } = await req.json()

	const createdModel = await prisma.model.create({
		data: model
	})

	return NextResponse.json(createdModel)
}