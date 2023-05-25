import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export const revalidate = 0
export async function GET() {
	const roles = await prisma.role.findMany()
	return NextResponse.json(roles)
}