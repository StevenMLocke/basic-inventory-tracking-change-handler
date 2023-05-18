import Link from "next/link";
import Accordion from "./accordion";
import { UserCard } from "@/components/userCard";

export default async function SideBar({ session }) {
	return (
		<aside className='2xl:w-1/6 border-r-2 border-slate-400 flex flex-col gap-2 p-4 bg-base-300'>
			{session && (
				<UserCard
					email={session.user.email}
					name={session.user.name}
					picUrl={session.user.image}
				></UserCard>
			)}
			<div className='flex flex-col flex-1 justify-between'>
				<div className='flex flex-col border-t-slate-400 border-t-2'>
					{(session.user.role === "admin" ||
						session.user.role === "transactor" ||
						session.user.role === "viewer" ||
						session.user.role === "asset manager") && (
						<Accordion title={"Asset Transactions"}>
							<ul className='menu menu-compact flex-1 flex-nowrap'>
								<li>
									<Link href={"/transact/view"}>View</Link>
								</li>
								{session.user.role !== "viewer" && (
									<>
										<li>
											<Link href={"/transact/checkin"}>Check In</Link>
										</li>
										<li>
											<Link href={"/transact/checkout"}>Check Out</Link>
										</li>
										<li>
											<Link href={"#"}>Move</Link>
										</li>
									</>
								)}
							</ul>
						</Accordion>
					)}
					{(session.user.role === "admin" ||
						session.user.role === "transactor" ||
						session.user.role === "asset manager") && (
						<Accordion title={"Manage"}>
							<ul className='menu menu-compact flex-1 flex-nowrap'>
								<li>
									<Link href={"/manage/user"}>Users</Link>
								</li>
								{(session.user.role === "admin" ||
									session.user.role === "asset manager") && (
									<li>
										<Link href={"/manage/asset"}>Assets</Link>
									</li>
								)}
								{(session.user.role === "admin" ||
									session.user.role === "asset manager") && (
									<li>
										<Link href={"/manage/manufacturer"}>Manufacturers</Link>
									</li>
								)}
								{(session.user.role === "admin" ||
									session.user.role === "asset manager") && (
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
			</div>
		</aside>
	);
}
