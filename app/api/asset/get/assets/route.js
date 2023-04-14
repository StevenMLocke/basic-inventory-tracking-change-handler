import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function GET() {
	const assets = await prisma.asset.findMany({
		select: {
			id: true,
			model: {
				select: {
					id: true,
					name: true,
					manufacturer: {
						select: {
							id: true,
							name: true
						}
					}
				}
			},
			asset_number: true,
			location: {
				select: {
					id: true,
					name: true
				}
			},
			status: true,
			user: true,
		},
		orderBy: {
			asset_number: 'asc'
		}
	})

	return NextResponse.json(assets)
}