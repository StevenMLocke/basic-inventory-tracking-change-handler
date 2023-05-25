import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export const revalidate = 0
export async function GET() {
	const statuses = await prisma.status.findMany()
	return NextResponse.json(statuses)
}