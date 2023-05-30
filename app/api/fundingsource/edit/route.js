import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { fundingsource } = await req.json()

	console.log(fundingsource)

	const editedFundingSource = await prisma.funding_source.update({
		where: {
			id: fundingsource.id
		},
		data: fundingsource
	})

	return NextResponse.json(editedFundingSource)
}