import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { manufacturer } = await req.json()

	const editedManufacturer = await prisma.manufacturer.update({
		where: {
			id: manufacturer.id
		},
		data: manufacturer
	})

	return NextResponse.json(editedManufacturer)
}