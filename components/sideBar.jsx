import Link from "next/link";
import Accordion from "./accordion";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import { Suspense } from "react";

export default async function SideBar() {
	const session = await getServerSession(authOptions);
	return (
		<aside className='md:w-1/6 border-r-2 border-slate-400 flex flex-col gap-2 p-4 bg-base-300'>
			{session.token.role !== "viewer" && (
				<Accordion title={"Asset Transactions"}>
					<ul className='menu menu-compact flex-1 flex-nowrap'>
						<li>
							<Link href={"#"}>Check In</Link>
						</li>
						<li>
							<Link href={"#"}>Check Out</Link>
						</li>
						<li>
							<Link href={"#"}>Move</Link>
						</li>
					</ul>
				</Accordion>
			)}
			{session.token.role === "admin" && (
				<Accordion title={"Manage"}>
					<ul className='menu menu-compact flex-1 flex-nowrap'>
						<li>
							<Link href={"/manage/asset"}>Assets</Link>
						</li>
						<li>
							<Link href={"/manage/user"}>Users</Link>
						</li>
						<li>
							<Link href={"/manage/manufacturer"}>Manufacturers</Link>
						</li>
						<li>
							<Link href={"/manage/model"}>Models</Link>
						</li>
						<li>
							<Link href={"/manage/location"}>Locations</Link>
						</li>
						<li>
							<Link href={"/manage/action"}>Actions</Link>
						</li>
					</ul>
				</Accordion>
			)}
			{session === null ? (
				<Link
					href={"api/auth/signin"}
					className='btn-outline btn-info btn-sm'
				>
					Sign In
				</Link>
			) : (
				<div className='flex flex-col justify-center gap-1'>
					<Suspense fallback={<p>wait a sec...</p>}>
						<Image
							src={session.token.picture}
							width={75}
							height={75}
							alt=''
							className='avatar rounded-full'
						></Image>
					</Suspense>
					<span className='label-text'>logged in as:</span>
					<span>{session.token.email}</span>
					<Link
						href={"/api/auth/signout"}
						className='btn-outline btn-info btn'
					>
						Sign Out
					</Link>
				</div>
			)}
		</aside>
	);
}
