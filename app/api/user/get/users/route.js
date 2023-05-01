import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
export async function GET() {

	const users = await prisma.user.findMany({
		select: {
			id: true,
			fn: true,
			ln: true,
			full_name: true,
			email: true,
			status: {
				select: {
					status: true,
				}
			},
			role: true
		}
	})
	return NextResponse.json(users)
}
