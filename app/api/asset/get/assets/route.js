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
		}
	})

	return NextResponse.json(assets)
}