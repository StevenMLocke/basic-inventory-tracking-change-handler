import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export const revalidate = 0
export async function GET() {
	const actions = await prisma.action.findMany()

	return NextResponse.json(actions)
}