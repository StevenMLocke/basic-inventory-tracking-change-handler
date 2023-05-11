import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const status = await req.json()
	const assetsByStatus = await prisma.asset.findMany({
		select: {
			id: true,
			asset_number: true,
			serial_number: true,
			model: {
				select: {
					manufacturer: {
						select: {
							name: true,
						}
					},
					name: true,
				}
			},
			user: {
				select: {
					id: true,
					full_name: true,
					email: true
				}
			},
		},
		where: {
			status_id: status.id
		}
	})
	return NextResponse.json(assetsByStatus)
}