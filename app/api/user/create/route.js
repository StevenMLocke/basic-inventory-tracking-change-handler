import prisma from './../../../../lib/db'
import { NextResponse } from 'next/server'

export async function POST(request) {
	const { user } = await request.json()
	const newUser = await prisma.user.create({ data: user })
	return NextResponse.json(newUser)
}

export async function GET() {
	return NextResponse.json({ msg: "Hola, Mundo!" })
}