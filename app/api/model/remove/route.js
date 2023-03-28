import { PrismaClient } from "@prisma/client";
import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const p = new PrismaClient()

	const { model } = await req.json()
	const removedModel = await p.model.delete({
		where: {
			id: model.id
		}
	})

	return NextResponse.json(removedModel)
}