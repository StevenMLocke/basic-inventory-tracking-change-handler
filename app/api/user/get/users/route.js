import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export const revalidate = 0
export async function GET() {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			fn: true,
			ln: true,
			full_name: true,
			email: true,
			role: true,
			authorized_bitch_user: true,
		},
		orderBy: {
			full_name: 'asc'
		}
	})
	return NextResponse.json(users)
}
