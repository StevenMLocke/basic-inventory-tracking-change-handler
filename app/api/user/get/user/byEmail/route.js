import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const user = await req.json()
	const foundUser = await prisma.user.findUnique({
		where: {
			email: user.email
		}
	})

	return NextResponse.json(foundUser)
}