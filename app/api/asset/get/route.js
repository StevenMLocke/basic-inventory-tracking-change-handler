import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function GET() {
	const assets = await prisma.asset.findMany()

	return NextResponse.json(assets)
}