import { postData } from "@/lib/helpers"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/api/auth/signin')
	}

	const { asset_num } = params
	const data = { asset_number: asset_num }

	const asset = await postData(`$process.env.API{}asset/get/asset`, data)
	return (session.user.role === "admin" ?
		<div className="flex flex-1 justify-center">
			<div className="flex flex-col border-2 border-white items-center justify-evenly">
				<div className="flex border-2 border-red-700 w-full justify-center">
					<div className="card card-compact card-bordered bg-base-300 shadow-sm shadow-neutral-300">
						<div className="card-body">
							<h2 className="card-title">Asset</h2>
							<p>Asset#: {asset.asset_number}</p>
							<p>Model: {asset.model.name}</p>
							<p>Manufacturer: {asset.model.manufacturer.name}</p>
						</div>
					</div>
				</div>
				<pre>{JSON.stringify(asset, null, 2)}</pre>
			</div>
		</div> : redirect('/')
	)
}