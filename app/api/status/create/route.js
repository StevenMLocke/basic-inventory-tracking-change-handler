
import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { status } = await req.json()
	const createdStatus = await prisma.status.create({
		data: status,
	})

	return NextResponse.json(createdStatus)
}