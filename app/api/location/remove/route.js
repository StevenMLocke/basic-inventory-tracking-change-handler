import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { location } = await req.json()
	const removedLocation = await prisma.location.delete({
		where: {
			id: location.id,
		},
	})

	return NextResponse.json(removedLocation)
}