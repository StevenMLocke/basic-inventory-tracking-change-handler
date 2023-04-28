import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { status } = await req.json()
	const assetsByStatus = await prisma.asset.findMany({
		select: {
			id: true,
			asset_number: true,
			serial_number: true,
			location: true,
			model: {
				include: {
					manufacturer: true,
				}
			},
			status: true,
			user: true,
		},
		where: {
			status_id: status.id
		}
	})
	return NextResponse.json(assetsByStatus)
}