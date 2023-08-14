import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { id } = await req.json()

	const removedCategory = await prisma.category.delete({
		where: {
			id,
		}
	})

	return NextResponse.json(removedCategory)
}