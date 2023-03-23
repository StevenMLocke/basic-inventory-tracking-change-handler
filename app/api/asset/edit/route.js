import { PrismaClient } from "@prisma/client";
import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const p = new PrismaClient()
	const asset = await req.json()

	const editedAsset = await p.asset.update({
		where: {
			id: asset.id,
		},
		data: asset
	})

	return NextResponse.json(editedAsset)
}