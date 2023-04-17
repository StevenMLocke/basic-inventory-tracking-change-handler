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
						<Link href={'/'}>Home</Link>
					</li>
					<li>
						<Link href={'/manage/'}>Manage</Link>
					</li>
					<div className='flex'>
						<div className='divider divider-horizontal'></div>
						<ul className='menu menu-compact'>
							<li>
								<Link href={'/manage/user'}>Users</Link>
							</li>
							<li>
								<Link href={'/manage/asset'}>Assets</Link>
							</li>
							<li>
								<Link href={'/manage/action'}>Actions</Link>
							</li>
							<li>
								<Link href={'/manage/permission'} >Permissions</Link>
							</li>
							<li>
								<Link href={'/manage/transaction'}>Transactions</Link>
							</li>
							<li>
								<Link href={'/manage/manufacturer'}>Manufacturers</Link>
							</li>
							<li>
								<Link href={'/manage/model'}>Models</Link>
							</li>
						</ul>
					</div>

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