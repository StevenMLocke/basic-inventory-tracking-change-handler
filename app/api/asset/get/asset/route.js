import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { asset_number } = await req.json()

	const asset = await prisma.asset.findUnique({
		where: {
			asset_number: asset_number
		},
		select: {
			id: true,
			asset_number: true,
			model: {
				select: {
					name: true,
					manufacturer: {
						select: {
							name: true
						}
					}
				}
			}
		}
	})

	return NextResponse.json(asset)
}