import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { action } = await req.json()
	const newAction = await prisma.action.create({ data: action })

	return NextResponse.json(newAction)
}