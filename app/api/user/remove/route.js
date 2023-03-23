import { NextResponse } from 'next/server'
import prisma from './../../../../lib/db'

export async function POST(req) {
	const id = await req.json()

	const deletedUser = await prisma.user.delete({
		where: {
			id,
		}
	})

	return NextResponse.json({ deletedUser })
}