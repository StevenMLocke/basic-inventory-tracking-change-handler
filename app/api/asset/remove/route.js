import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { id } = await req.json()

	const removedAsset = await prisma.asset.delete({
		where: {
			id,
		}
	})

	return NextResponse.json(removedAsset)
}