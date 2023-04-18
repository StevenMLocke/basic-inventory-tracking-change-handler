import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { location } = await req.json()
	const editedLocation = await prisma.location.update({
		where: {
			id: location.id
		},
		data: location
	})
	return NextResponse.json(editedLocation)
}