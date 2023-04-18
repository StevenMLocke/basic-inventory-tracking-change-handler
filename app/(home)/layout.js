import SideBar from './../../components/sideBar.jsx'
import { Main } from '../../components/main.jsx'
import Link from 'next/link.js'
import { Suspense } from 'react'
export default function ModifyLayout({ children }) {
	return (
		<div className="page-wrapper flex h-[100cqh] md:w-5/6 mx-auto">
			<SideBar>
				<ul className='menu menu-compact'>
					<li>
						<Link href={'/'}>Asset Transactions</Link>
					</li>
					<div className='flex'>
						<div className='divider divider-horizontal'></div>
						<ul className='menu menu-compact'>
							<li>
								<Link href={''}>View Transactions</Link>
							</li>
							<li>
								<Link href={''}>Check In Asset</Link>
							</li>
							<li>
								<Link href={''}>Check Out Asset</Link>
							</li>
							<li>
								<Link href={''}>Move Asset</Link>
							</li>
						</ul>
					</div>
					<li>
						<Link href={'/manage/'}>Manage</Link>
					</li>
				</ul>
			</SideBar>
			<Main>
				<Suspense fallback={<div>One Moment...</div>}>
					{children}
				</Suspense>
			</Main>
		</div>
	)
}