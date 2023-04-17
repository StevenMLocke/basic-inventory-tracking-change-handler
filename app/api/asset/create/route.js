import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { asset } = await req.json()
	const createdAsset = await prisma.asset.create({ data: asset, })

	return NextResponse.json(createdAsset)
}