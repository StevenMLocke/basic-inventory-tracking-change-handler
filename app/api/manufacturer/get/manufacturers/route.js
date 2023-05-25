import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export const revalidate = 0
export async function GET() {
	const manufacturers = await prisma.manufacturer.findMany()
	return NextResponse.json(manufacturers)
}