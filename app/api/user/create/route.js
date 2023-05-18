import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request) {
	const { user } = await request.json()

	user.full_name = `${user.fn} ${user.ln}`
	if (user.authorized_bitch_user) {
		user.authorized_bitch_user = (user.authorized_bitch_user === "Yes" || user.authorized_bitch_user === "1") ? 1 : 0
	}

	if (!user.role_id) {
		const role = await prisma.role.findUnique({
			where: {
				name: "asset user"
			},
			select: {
				id: true
			}
		})
		user.role_id = role.id
	}

	const newUser = await prisma.user.create({ data: user })
	return NextResponse.json(newUser)
}

export async function GET() {
	return NextResponse.json({ msg: "Hola, Mundo!" })
}