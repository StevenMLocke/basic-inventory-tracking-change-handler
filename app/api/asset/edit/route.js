import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { asset } = await req.json()

	delete asset.model
	delete asset.manufacturer
	delete asset.location_name
	delete asset.status_name
	delete asset.user_email

	const editedAsset = await prisma.asset.update({
		where: {
			id: asset.id,
		},
		data: asset
	})

	return NextResponse.json(editedAsset)
}