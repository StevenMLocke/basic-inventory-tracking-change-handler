import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { asset } = await req.json()

	delete asset.model
	delete asset.manufacturer
	delete asset.location_name

	const editedAsset = await prisma.asset.update({
		where: {
			id: asset.id,
		},
		data: asset
	})

	return NextResponse.json(editedAsset)
}