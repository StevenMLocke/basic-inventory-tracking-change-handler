import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { category } = await req.json()

	const editedCategory = await prisma.category.update({
		where: {
			id: category.id
		},
		data: category
	})

	return NextResponse.json(editedCategory)
}