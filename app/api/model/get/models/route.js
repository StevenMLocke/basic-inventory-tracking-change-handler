import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function GET() {

	const models = await prisma.model.findMany({
		select: {
			id: true,
			name: true,
			manufacturer: {
				select: {
					id: true,
					name: true
				}
			}
		},
		orderBy: {
			manufacturer: {
				name: 'asc'
			}
		}
	})
	return NextResponse.json(models)
}