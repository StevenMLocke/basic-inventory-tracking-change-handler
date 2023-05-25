import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export const revalidate = 0
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
			serial_number: true,
			status: true,
			user: {
				select: {
					fn: true,
					ln: true,
					full_name: true,
					email: true
				}
			},
		},
		orderBy: {
			asset_number: 'asc'
		}
	})
	return NextResponse.json(assets)
}