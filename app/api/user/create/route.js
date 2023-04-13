import prisma from './../../../../lib/db'
import { NextResponse } from 'next/server'

export async function POST(request) {
	const { user } = await request.json()

	user.full_name = `${user.ln}, ${user.fn}`
	user.status_id = `d5b0ac69-557a-4750-8f1a-5488c32a9ce9`

	const newUser = await prisma.user.create({ data: user })
	return NextResponse.json(newUser)
}

export async function GET() {
	return NextResponse.json({ msg: "Hola, Mundo!" })
}