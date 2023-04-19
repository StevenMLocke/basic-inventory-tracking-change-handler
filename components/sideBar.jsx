import Link from "next/link";
import Accordion from "./accordion";

export default function SideBar({ children }) {
	return (
		<aside className='md:w-1/6 border-r-2 border-slate-400 flex flex-col gap-2 p-4 bg-base-300'>
			<Accordion title={"Asset Transactions"}>
				<ul className='menu menu-compact'>
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
			<Accordion title={"Manage"}>
				<ul className='menu menu-compact'>
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
			{children}
		</aside>
	);
}
