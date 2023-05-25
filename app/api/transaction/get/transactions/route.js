import prisma from '@/lib/db'
import { NextResponse } from "next/server";

export const revalidate = 0
export async function GET() {
	const transactions = await prisma.transaction.findMany({
		select: {
			date: true,
			asset: {
				select: {
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
					},
					serial_number: true
				}
			},
			action: {
				select: {
					type: true
				}
			},
			user_transaction_action_user_idTouser: {
				select: {
					full_name: true
				},

			},
			user_transaction_asset_user_idTouser: {
				select: {
					full_name: true,
					email: true
				}
			},
		},
		orderBy: {
			date: 'desc'
		}
	})
	return NextResponse.json(transactions)
}