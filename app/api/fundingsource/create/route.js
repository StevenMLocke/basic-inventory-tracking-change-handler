import { PrismaClient } from "@prisma/client";
import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const { fundingsource } = await req.json()

	const newFundingSource = await prisma.funding_source.create({ data: { ...fundingsource } })

	return NextResponse.json(newFundingSource)
}