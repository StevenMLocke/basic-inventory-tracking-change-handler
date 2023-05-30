import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { asset } = await req.json()
	if (!asset.location_id) {
		const location = await prisma.location.findUnique({
			where: {
				name: "In stock"
			},
			select: {
				id: true,
			}
		})
		asset.location_id = location.id
	}
	if (!asset.status_id) {
		const status = await prisma.status.findUnique({
			where: {
				name: "Checked In"
			},
			select: {
				id: true
			}
		})
		asset.status_id = status.id
	}

	asset.purchase_date = asset.purchase_date !== null ? new Date(asset.purchase_date) : null

	let createdAsset
	try {
		createdAsset = await prisma.asset.create({ data: asset, })

	} catch (e) {

		throw e
	}
	return NextResponse.json(createdAsset)
}