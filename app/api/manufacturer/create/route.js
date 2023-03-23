import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { manufacturer } = await req.json()

	const newManufacturer = await prisma.manufacturer.create({ data: { ...manufacturer } })

	return NextResponse.json(newManufacturer)
}