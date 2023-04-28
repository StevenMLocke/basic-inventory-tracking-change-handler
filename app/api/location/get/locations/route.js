import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function GET(req) {
	const locations = await prisma.location.findMany()
	return NextResponse.json(locations)
} 