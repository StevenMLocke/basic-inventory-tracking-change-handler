import Link from "next/link";
import Accordion from "./accordion";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserCard } from "@/components/userCard";

export default async function SideBar() {
	const session = await getServerSession(authOptions);
	return (
		<aside className='md:w-1/6 border-r-2 border-slate-400 flex flex-col gap-2 p-4 bg-base-300'>
			{session && (
				<UserCard
					email={session.user.email}
					name={session.user.name}
					picUrl={session.user.image}
				></UserCard>
			)}

			<div className='flex flex-col pt-4'>
				{session.user.role !== "viewer" && (
					<Accordion title={"Asset Transactions"}>
						<ul className='menu menu-compact flex-1 flex-nowrap'>
							<li>
								<Link href={"#"}>View</Link>
							</li>
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
				{session.user.role !== "viewer" && (
					<Accordion title={"Manage"}>
						<ul className='menu menu-compact flex-1 flex-nowrap'>
							{session.user.role !== "viewer" && (
								<li>
									<Link href={"/manage/user"}>Users</Link>
								</li>
							)}
							{session.user.role === "admin" && (
								<li>
									<Link href={"/manage/asset"}>Assets</Link>
								</li>
							)}
							{session.user.role === "admin" && (
								<li>
									<Link href={"/manage/manufacturer"}>Manufacturers</Link>
								</li>
							)}
							{session.user.role === "admin" && (
								<li>
									<Link href={"/manage/model"}>Models</Link>
								</li>
							)}
							{session.user.role === "admin" && (
								<li>
									<Link href={"/manage/location"}>Locations</Link>
								</li>
							)}
							{session.user.role === "admin" && (
								<li>
									<Link href={"/manage/action"}>Actions</Link>
								</li>
							)}
						</ul>
					</Accordion>
				)}
			</div>
		</aside>
	);
}
