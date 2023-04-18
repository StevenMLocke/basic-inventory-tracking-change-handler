import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { location } = await req.json()
	const createdLocation = await prisma.location.create({ data: location, })

	return NextResponse.json(createdLocation)
}