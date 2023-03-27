import { PrismaClient } from "@prisma/client";
import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
	const p = new PrismaClient()
	const model = await req.json()

	const createdModel = await p.model.create({
		data: model
	})

	return NextResponse.json(createdModel)
}