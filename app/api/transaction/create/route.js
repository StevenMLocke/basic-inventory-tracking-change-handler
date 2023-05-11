
import prisma from '@/lib/db'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

export async function POST(req) {
	const transaction = await req.json()
	const p = new PrismaClient()
	const createdTransaction = await prisma.transaction.create({
		data: transaction
	})

	return NextResponse.json(createdTransaction)
}