import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { role } = await req.json()

	const createdRole = await prisma.role.create({
		data: role
	})

	return NextResponse.json(createdRole)
}