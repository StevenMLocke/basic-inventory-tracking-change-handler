import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import SectionHero from "@/components/sectionHero"
import { ViewAssetsTable } from './../components/viewAssetsTable'
import { Suspense } from "react"
import prisma from '@/lib/db'
import { ContentWrapper } from "@/components/structures"

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/view/alltransactions')
	}

	const assets = await prisma.asset.findMany({
		select: {
			asset_number: true,
			serial_number: true,
			funding_source: {
				select: {
					name: true
				},
			},
			location: {
				select: {
					name: true,
				},
			},
			status: {
				select: {
					name: true,
				},
			},
			purchase_date: true,
			user: {
				select: {
					email: true,
					full_name: true,
				},
			},
			model: {
				select: {
					manufacturer: {
						select: {
							name: true,
						},
					},
					name: true,
				},
			},
		}
	})

	const data = assets.map(asset => {
		const dateToString = (asset) => {
			if (asset.purchase_date) {
				const dateObj = new Date(asset.purchase_date);
				return dateObj.toLocaleDateString("en-us", {
					year: "numeric",
					month: "short",
					day: "numeric",
				});
			}
			return null
		}

		return ({
			formattedPurchaseDate: dateToString(asset),
			...asset,
		})
	})

	return (
		<ContentWrapper heroText={`Assets`}>
			<Suspense fallback={<p>Suspenseful!!!</p>}>
				<ViewAssetsTable dataData={data}></ViewAssetsTable>
			</Suspense>
		</ContentWrapper>
	)
}