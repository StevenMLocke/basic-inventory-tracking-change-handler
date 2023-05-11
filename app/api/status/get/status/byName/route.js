import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function GET(req) {
	const q = await req.nextUrl.searchParams.get('q')

	const status = await prisma.status.findFirst({
		where: {
			name: q
		}
	})
	return NextResponse.json(status)
}